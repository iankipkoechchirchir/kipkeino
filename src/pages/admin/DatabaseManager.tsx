import React, { useState, useEffect } from 'react';
import { Database, Server, Key, Terminal, RefreshCw, CheckCircle, AlertTriangle, Play } from 'lucide-react';

interface SchemaLog {
  id: number;
  statement: string;
  status: 'executed' | 'pending' | 'failed';
}

export default function DatabaseManager() {
  const [dbConfig, setDbConfig] = useState({
    host: 'localhost',
    user: 'Kipkoech',
    port: 3306,
    database: 'esms_db',
    poolLimit: 10,
    sslEnabled: false
  });

  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'fallback' | 'checking'>('checking');
  const [dbStatusInfo, setDbStatusInfo] = useState<any>(null);
  const [logs, setLogs] = useState<SchemaLog[]>([
    { id: 1, statement: 'CREATE DATABASE IF NOT EXISTS esms_db;', status: 'executed' },
    { id: 2, statement: 'CREATE TABLE users (id INT, username, password, email, role, status, created_at);', status: 'executed' },
    { id: 3, statement: 'CREATE TABLE staff (id, user_id, name, role, department, salary, shift, status, hire_date);', status: 'executed' },
    { id: 4, statement: 'CREATE TABLE athletes (id, name, discipline, age, coach_id, status, medical_clearance);', status: 'executed' },
    { id: 5, statement: 'INSERT INTO users (id, username, password, email, role, status) VALUES (\'admin\', \'Kipkoech\');', status: 'executed' },
    { id: 6, statement: 'CREATE TABLE facilities (id, name, type, capacity, status, completion_percentage);', status: 'executed' }
  ]);

  const [queryInput, setQueryInput] = useState('SELECT * FROM users WHERE role = \'admin\';');
  const [terminalOutput, setTerminalOutput] = useState<string>(`-- MySQL Terminal output v8.0.35 --
mysql> SELECT * FROM users WHERE role = 'admin';
+----+----------+------------------+-----------------------------+-------+--------+---------------------+
| id | username | password         | email                       | role  | status | created_at          |
+----+----------+------------------+-----------------------------+-------+--------+---------------------+
|  1 | admin    | Kipkoech         | admin@eldoretstadium.go.ke  | admin | active | 2026-06-27 12:00:00 |
+----+----------+------------------+-----------------------------+-------+--------+---------------------+
1 row in set (0.00 sec)`);

  const fetchDbStatus = async () => {
    setConnectionStatus('checking');
    try {
      const response = await fetch('/api/db/status');
      const data = await response.json();
      setDbStatusInfo(data);
      if (data.connected) {
        setConnectionStatus('connected');
        setDbConfig({
          host: data.host,
          user: data.user,
          port: data.port || 3306,
          database: data.database,
          poolLimit: 10,
          sslEnabled: false
        });
      } else {
        setConnectionStatus('fallback');
      }
    } catch (err) {
      console.error('Error fetching db status:', err);
      setConnectionStatus('fallback');
    }
  };

  useEffect(() => {
    fetchDbStatus();
  }, []);

  const runTestQuery = async () => {
    setTerminalOutput(`mysql> ${queryInput}\nExecuting query...`);
    try {
      const response = await fetch('/api/db/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sql: queryInput })
      });
      const data = await response.json();

      if (data.success) {
        const rows = data.result;

        if (Array.isArray(rows)) {
          if (rows.length === 0) {
            setTerminalOutput(`mysql> ${queryInput}\nEmpty set (0.01 sec)`);
            return;
          }

          // Generate professional ASCII grid table
          const keys = Object.keys(rows[0]);
          const colWidths: Record<string, number> = {};
          
          keys.forEach(key => {
            colWidths[key] = key.length;
          });

          rows.forEach((row: any) => {
            keys.forEach(key => {
              const valStr = row[key] === null ? 'NULL' : String(row[key]);
              colWidths[key] = Math.max(colWidths[key], valStr.length);
            });
          });

          // Draw separator line
          let separator = '+';
          keys.forEach(key => {
            separator += '-'.repeat(colWidths[key] + 2) + '+';
          });

          // Draw header
          let header = '|';
          keys.forEach(key => {
            header += ' ' + key.padEnd(colWidths[key]) + ' |';
          });

          // Draw row records
          let outputRows = '';
          rows.forEach((row: any) => {
            let rowText = '|';
            keys.forEach(key => {
              const valStr = row[key] === null ? 'NULL' : String(row[key]);
              rowText += ' ' + valStr.padEnd(colWidths[key]) + ' |';
            });
            outputRows += rowText + '\n';
          });

          const formattedOutput = `mysql> ${queryInput}\n${separator}\n${header}\n${separator}\n${outputRows}${separator}\n${rows.length} row${rows.length === 1 ? '' : 's'} in set (0.01 sec)`;
          setTerminalOutput(formattedOutput);
        } else {
          // If update/insert/delete query (affected rows)
          const affected = rows && typeof rows.affectedRows === 'number' ? rows.affectedRows : 1;
          setTerminalOutput(`mysql> ${queryInput}\nQuery OK, ${affected} row${affected === 1 ? '' : 's'} affected (0.01 sec)`);
        }
      } else {
        setTerminalOutput(`mysql> ${queryInput}\nERROR: ${data.error || 'Syntax or connection error occurred.'}`);
      }
    } catch (err: any) {
      setTerminalOutput(`mysql> ${queryInput}\nERROR: HTTP transmission failed: ${err.message}`);
    }
  };

  const revalidateDatabase = () => {
    fetchDbStatus();
  };

  return (
    <div className="space-y-6" id="mgmt-db-manager-page">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <h2 className="text-2xl font-serif font-light text-white tracking-tight">Database Administration Portal</h2>
          <p className="text-xs text-neutral-500 font-mono mt-0.5">Admin-Only Pool Controls • Relational MySQL configuration via schema.sql</p>
        </div>
        <button
          onClick={revalidateDatabase}
          disabled={connectionStatus === 'checking'}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold rounded font-mono border border-neutral-800 transition disabled:opacity-50"
          id="btn-revalidate-db"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${connectionStatus === 'checking' ? 'animate-spin' : ''}`} />
          Verify Connection Pool
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Connection Setup Configuration Panel */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <Server className="w-4 h-4 text-amber-500" />
            MySQL Configuration (mysql2)
          </h3>
          <div className="space-y-3 text-xs font-mono">
            <div>
              <span className="text-neutral-500 block uppercase font-bold text-[9px]">DB Connection URI</span>
              <div className="mt-1 flex items-center gap-2 bg-neutral-900 border border-neutral-850 p-2 rounded">
                <Database className="w-3.5 h-3.5 text-neutral-500" />
                <span className="text-neutral-300 overflow-x-auto text-[11px]">mysql://Kipkoech:****@{dbConfig.host}:{dbConfig.port}/{dbConfig.database}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-neutral-500 block uppercase font-bold text-[9px] mb-1">Host Name</label>
                <input
                  type="text"
                  value={dbConfig.host}
                  onChange={(e) => setDbConfig({ ...dbConfig, host: e.target.value })}
                  className="w-full px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-300"
                />
              </div>
              <div>
                <label className="text-neutral-500 block uppercase font-bold text-[9px] mb-1">Username</label>
                <input
                  type="text"
                  value={dbConfig.user}
                  onChange={(e) => setDbConfig({ ...dbConfig, user: e.target.value })}
                  className="w-full px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-300"
                />
              </div>
              <div>
                <label className="text-neutral-500 block uppercase font-bold text-[9px] mb-1">Port</label>
                <input
                  type="number"
                  value={dbConfig.port}
                  onChange={(e) => setDbConfig({ ...dbConfig, port: parseInt(e.target.value) || 3306 })}
                  className="w-full px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-300"
                />
              </div>
              <div>
                <label className="text-neutral-500 block uppercase font-bold text-[9px] mb-1">Database</label>
                <input
                  type="text"
                  value={dbConfig.database}
                  onChange={(e) => setDbConfig({ ...dbConfig, database: e.target.value })}
                  className="w-full px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-300"
                />
              </div>
            </div>

            {connectionStatus === 'connected' ? (
              <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg flex items-start gap-2 pt-4">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div className="text-neutral-400">
                  <span className="font-bold text-emerald-400 block">MySQL Connected</span>
                  <p className="mt-0.5 text-[10px] leading-relaxed">System successfully linked to live MySQL instance. Operating properly under active pool allocation.</p>
                </div>
              </div>
            ) : connectionStatus === 'checking' ? (
              <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg flex items-start gap-2 pt-4">
                <RefreshCw className="w-4 h-4 text-amber-400 mt-0.5 shrink-0 animate-spin" />
                <div className="text-neutral-400">
                  <span className="font-bold text-amber-400 block">Connecting...</span>
                  <p className="mt-0.5 text-[10px] leading-relaxed">Verifying system TCP transport layers and establishing connection pool.</p>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg flex items-start gap-2 pt-4">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <div className="text-neutral-400">
                  <span className="font-bold text-amber-400 block">In-Memory Fallback Active</span>
                  <p className="mt-0.5 text-[10px] leading-relaxed">Local MySQL daemon is offline. Executing queries via the sandboxed in-memory engine (with full seed tables).</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Database SQL Sandbox Terminal */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-[#0A0A0A] border border-neutral-800 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono mb-3 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-amber-500" />
                SQL Query Console
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  placeholder="SELECT * FROM users;"
                  className="flex-1 px-3 py-2 text-xs font-mono rounded border border-neutral-800 bg-neutral-900 text-white focus:outline-none focus:border-amber-500"
                />
                <button
                  onClick={runTestQuery}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono text-xs rounded uppercase tracking-wider flex items-center gap-1"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  Run
                </button>
              </div>
            </div>

            <div className="mt-4 bg-neutral-950 p-4 rounded-lg border border-neutral-900 text-neutral-300 font-mono text-xs overflow-x-auto whitespace-pre h-48 select-text">
              {terminalOutput}
            </div>
          </div>
        </div>
      </div>

      {/* Schema Migration State Trackers */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono mb-4">Schema Execution Logs (schema.sql)</h3>
        <div className="space-y-2 max-h-56 overflow-y-auto">
          {logs.map((log) => (
            <div key={log.id} className="flex items-center justify-between p-2.5 bg-neutral-900 rounded border border-neutral-850 text-xs font-mono">
              <span className="text-neutral-400 truncate max-w-lg md:max-w-2xl">{log.statement}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
