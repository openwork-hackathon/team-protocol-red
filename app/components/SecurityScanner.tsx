'use client';

import React, { useState, useEffect } from 'react';

interface SecurityCheck {
  id: string;
  name: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  passed: boolean;
  message?: string;
  fixable: boolean;
}

interface ScanResult {
  checks: SecurityCheck[];
  summary: {
    total: number;
    passed: number;
    failed: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  riskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'CLEAN';
}

export default function SecurityScanner() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [scanProgress, setScanProgress] = useState(0);

  const runScan = async () => {
    setScanning(true);
    setScanProgress(0);
    setResult(null);

    // Simulate progressive scanning
    for (let i = 0; i <= 100; i += 10) {
      setScanProgress(i);
      await new Promise(r => setTimeout(r, 200));
    }

    // Mock result based on typical OpenClaw scan
    const mockResult: ScanResult = {
      checks: [
        {
          id: 'GATEWAY-002',
          name: 'WebSocket Origin Validation',
          description: 'Gateway lacks WebSocket origin validation (GHSA-g8p2)',
          severity: 'critical',
          passed: false,
          message: 'Missing security.websocketOrigins - vulnerable to cross-origin attacks',
          fixable: false
        },
        {
          id: 'GATEWAY-003',
          name: 'Token Exposed in Config',
          description: 'Plaintext authentication token stored in configuration file',
          severity: 'critical',
          passed: true,
          message: 'Token properly secured with environment variables',
          fixable: true
        },
        {
          id: 'HEARTBEAT-003',
          name: 'Unsigned Heartbeat',
          description: 'Heartbeat file lacks cryptographic signature',
          severity: 'high',
          passed: false,
          message: 'Heartbeat is unsigned - cannot verify authenticity',
          fixable: false
        },
        {
          id: 'CVE-2026-25253',
          name: 'ClawHavoc IOC Check',
          description: 'Scan for ClawHavoc malware indicators',
          severity: 'critical',
          passed: true,
          message: 'No ClawHavoc IOCs detected - system clean',
          fixable: false
        },
        {
          id: 'CRED-001',
          name: 'Exposed API Keys',
          description: 'Check for hardcoded API keys and tokens',
          severity: 'high',
          passed: true,
          message: 'No exposed credentials found',
          fixable: true
        },
        {
          id: 'NET-001',
          name: 'Network Binding',
          description: 'Check for insecure network binding',
          severity: 'medium',
          passed: true,
          message: 'Gateway properly bound to localhost',
          fixable: true
        }
      ],
      summary: {
        total: 6,
        passed: 4,
        failed: 2,
        critical: 0,
        high: 1,
        medium: 0,
        low: 0
      },
      riskLevel: 'HIGH'
    };

    setResult(mockResult);
    setScanning(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 border-red-600 bg-red-950/20';
      case 'high': return 'text-orange-400 border-orange-500 bg-orange-950/20';
      case 'medium': return 'text-yellow-400 border-yellow-500 bg-yellow-950/20';
      case 'low': return 'text-blue-400 border-blue-500 bg-blue-950/20';
      default: return 'text-gray-400 border-gray-500';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'CRITICAL': return 'text-red-500';
      case 'HIGH': return 'text-orange-400';
      case 'MEDIUM': return 'text-yellow-400';
      case 'LOW': return 'text-blue-400';
      case 'CLEAN': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="border-2 border-red-900 bg-black p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-red-500 flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            AGENT SECURITY SCANNER
          </h2>
          <p className="text-[10px] text-red-400 mt-1">
            Powered by HackMyAgent | 147 Security Checks | OpenA2A Standard
          </p>
        </div>
        <button
          onClick={runScan}
          disabled={scanning}
          className="bg-red-600 text-black px-6 py-2 font-bold uppercase hover:bg-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {scanning ? `[ Scanning... ${scanProgress}% ]` : '[ Run Scan ]'}
        </button>
      </div>

      {scanning && (
        <div className="mb-6">
          <div className="h-2 bg-red-900/30 overflow-hidden">
            <div 
              className="h-full bg-red-600 transition-all duration-300"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
          <div className="text-[10px] text-red-400 mt-2 font-mono">
            {scanProgress < 30 && '> Initializing security modules...'}
            {scanProgress >= 30 && scanProgress < 60 && '> Checking gateway configurations...'}
            {scanProgress >= 60 && scanProgress < 90 && '> Scanning for CVEs and IOCs...'}
            {scanProgress >= 90 && '> Analyzing results...'}
          </div>
        </div>
      )}

      {result && (
        <>
          {/* Risk Level Banner */}
          <div className={`mb-6 p-4 border-2 ${getSeverityColor(result.riskLevel === 'CLEAN' ? 'low' : result.riskLevel === 'CRITICAL' ? 'critical' : 'high')}`}>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-[10px] uppercase tracking-wider opacity-70">Risk Level</div>
                <div className={`text-2xl font-black ${getRiskColor(result.riskLevel)}`>
                  {result.riskLevel}
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">
                  {Math.round((result.summary.passed / result.summary.total) * 100)}%
                </div>
                <div className="text-[10px] text-red-400">Security Score</div>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            <div className="border border-red-900 p-3 text-center">
              <div className="text-2xl font-bold text-red-500">{result.summary.critical}</div>
              <div className="text-[9px] text-red-400 uppercase">Critical</div>
            </div>
            <div className="border border-orange-900 p-3 text-center">
              <div className="text-2xl font-bold text-orange-400">{result.summary.high}</div>
              <div className="text-[9px] text-orange-400 uppercase">High</div>
            </div>
            <div className="border border-yellow-900 p-3 text-center">
              <div className="text-2xl font-bold text-yellow-400">{result.summary.medium}</div>
              <div className="text-[9px] text-yellow-400 uppercase">Medium</div>
            </div>
            <div className="border border-green-900 p-3 text-center">
              <div className="text-2xl font-bold text-green-400">{result.summary.passed}</div>
              <div className="text-[9px] text-green-400 uppercase">Passed</div>
            </div>
          </div>

          {/* Check Details */}
          <div className="space-y-2">
            <div className="text-[10px] text-red-400 uppercase tracking-wider mb-3">Detailed Results</div>
            {result.checks.map((check) => (
              <div 
                key={check.id}
                className={`border p-3 ${getSeverityColor(check.severity)} ${check.passed ? 'opacity-60' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className={`text-lg ${check.passed ? 'text-green-400' : 'text-red-500'}`}>
                      {check.passed ? '✓' : '✗'}
                    </span>
                    <div>
                      <div className="font-bold text-sm">{check.name}</div>
                      <div className="text-[10px] opacity-70">{check.id} | {check.severity.toUpperCase()}</div>
                    </div>
                  </div>
                  {!check.passed && check.fixable && (
                    <button className="text-[10px] bg-red-600 text-black px-3 py-1 hover:bg-white transition-colors">
                      [ Auto-Fix ]
                    </button>
                  )}
                </div>
                <div className="mt-2 text-[11px] opacity-80">
                  {check.message || check.description}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <button className="flex-1 border border-red-600 text-red-600 py-3 font-bold uppercase hover:bg-red-600 hover:text-white transition-colors">
              [ Export Report ]
            </button>
            <button className="flex-1 bg-red-600 text-black py-3 font-bold uppercase hover:bg-red-500 transition-colors">
              [ Fix All Issues ]
            </button>
          </div>
        </>
      )}

      {!result && !scanning && (
        㰀div className="text-center py-12 text-red-400 opacity-50">
          <div className="text-4xl mb-4">🔍</div>
          <div className="text-sm">Click "Run Scan" to analyze your agent security</div>
          <div className="text-[10px] mt-2">Checks: CVE-2026-25253 | ClawHavoc IOCs | Gateway Config | Credential Leaks</div>
        </div>
      )}
    </div>
  );
}
