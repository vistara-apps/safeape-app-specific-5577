import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Shield, Bell } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-primary p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-textPrimary">SafeApe</h1>
              <p className="text-xs text-textSecondary">AI Trading Guard</p>
            </div>
          </div>

          {/* SOL Balance Widget */}
          <div className="hidden sm:flex items-center space-x-4">
            <div className="bg-surfaceElevated px-3 py-2 rounded-md border border-border">
              <div className="text-xs text-textSecondary">SOL Balance</div>
              <div className="text-sm font-mono text-primary">2.45 SOL</div>
            </div>
            
            {/* Notifications */}
            <button className="relative p-2 text-textSecondary hover:text-textPrimary transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-danger text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-3">
            <ConnectButton />
          </div>
        </div>

        {/* Mobile balance display */}
        <div className="sm:hidden mt-3 flex items-center justify-between">
          <div className="bg-surfaceElevated px-3 py-2 rounded-md border border-border">
            <span className="text-xs text-textSecondary">Balance: </span>
            <span className="text-sm font-mono text-primary">2.45 SOL</span>
          </div>
          <button className="relative p-2 text-textSecondary">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-danger text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;