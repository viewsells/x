import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  GitFork, 
  Users, 
  Clock, 
  GraduationCap, 
  Award, 
  Activity, 
  FolderGit2, 
  Layers, 
  Eye, 
  GitPullRequest, 
  GitBranch, 
  Sparkles, 
  Zap, 
  Lock, 
  Server, 
  Cpu, 
  Code2, 
  Check, 
  Copy,
  Hash,
  ChevronRight,
  TrendingUp,
  Flame,
  Globe,
  Radio,
  FileCheck
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceHeroVisualProps {
  service: ServiceItem;
  selectedTierPrice?: string;
  selectedTierLabel?: string;
}

export const ServiceHeroVisual = ({ service, selectedTierPrice, selectedTierLabel }: ServiceHeroVisualProps) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'specs' | 'security'>('preview');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [simulatedStars, setSimulatedStars] = useState(128);
  const [isStarring, setIsStarring] = useState(false);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const isAccount = service.category === 'accounts';
  const sId = service.id.toLowerCase();

  // Render Service-Specific Interactive Visual Center
  const renderVisualContent = () => {
    // 1. Aged GitHub Account
    if (sId.includes('aged')) {
      return (
        <div className="space-y-4">
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-[#30363D]">
              <span className="text-[#8B949E] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D29922]" />
                Registration Vintage
              </span>
              <span className="font-mono text-[#58A6FF] font-semibold">2018–2022 (4–7 Years)</span>
            </div>
            
            {/* Account Age Timeline */}
            <div className="relative pl-6 space-y-3 text-xs before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#30363D]">
              <div className="relative">
                <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#2DA44E] ring-4 ring-[#161B22]" />
                <div className="text-[#C9D1D9] font-medium">Account Created & Verified</div>
                <div className="text-[11px] text-[#8B949E]">Original Primary Mailbox Linked</div>
              </div>
              <div className="relative">
                <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#58A6FF] ring-4 ring-[#161B22]" />
                <div className="text-[#C9D1D9] font-medium">Matured Platform Tenure</div>
                <div className="text-[11px] text-[#8B949E]">0 Policy Flags • Clean Anti-Spam History</div>
              </div>
              <div className="relative">
                <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#D29922] ring-4 ring-[#161B22]" />
                <div className="text-[#C9D1D9] font-medium">Ready for Ownership Handover</div>
                <div className="text-[11px] text-[#2DA44E] font-semibold">48h Warranty • Full Mailbox Transfer</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-[#161B22] border border-[#30363D] p-2.5 rounded-lg">
              <span className="text-[10px] text-[#8B949E] block">Account Status</span>
              <span className="text-[#2DA44E] font-bold flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2DA44E] animate-pulse" />
                Available in Stock
              </span>
            </div>
            <div className="bg-[#161B22] border border-[#30363D] p-2.5 rounded-lg">
              <span className="text-[10px] text-[#8B949E] block">Delivery Speed</span>
              <span className="text-[#C9D1D9] font-mono font-semibold block mt-0.5">
                15–45 Minutes
              </span>
            </div>
          </div>
        </div>
      );
    }

    // 2. Student Developer Pack Account
    if (sId.includes('student')) {
      return (
        <div className="space-y-4">
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-[#30363D]">
              <span className="text-[#8B949E] flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#58A6FF]" />
                Pack Verification Status
              </span>
              <span className="bg-[#1F6FEB]/20 text-[#58A6FF] font-bold px-2 py-0.5 rounded text-[10px] border border-[#58A6FF]/30">
                ACTIVE STUDENT
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between bg-[#0D1117] p-2 rounded border border-[#30363D]">
                <span className="text-[#C9D1D9]">GitHub Copilot Pro</span>
                <span className="text-[#2DA44E] font-mono text-[11px] font-semibold">Included ($100/yr)</span>
              </div>
              <div className="flex items-center justify-between bg-[#0D1117] p-2 rounded border border-[#30363D]">
                <span className="text-[#C9D1D9]">Cloud Hosting Credits</span>
                <span className="text-[#58A6FF] font-mono text-[11px] font-semibold">$200+ Value</span>
              </div>
              <div className="flex items-center justify-between bg-[#0D1117] p-2 rounded border border-[#30363D]">
                <span className="text-[#C9D1D9]">JetBrains All Products</span>
                <span className="text-[#D29922] font-mono text-[11px] font-semibold">EDU License</span>
              </div>
            </div>
          </div>

          <div className="bg-[#161B22] border border-[#30363D] p-3 rounded-lg flex items-center justify-between text-xs">
            <span className="text-[#8B949E]">Total Developer Tool Value:</span>
            <span className="font-mono font-bold text-[#2DA44E] text-sm">$200,000+ Suite</span>
          </div>
        </div>
      );
    }

    // 3. Active / Commits Account
    if (sId.includes('active') || sId.includes('commit')) {
      return (
        <div className="space-y-4">
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-[#30363D]">
              <span className="text-[#8B949E] flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#2DA44E]" />
                Public Contribution Heatmap
              </span>
              <span className="text-[#2DA44E] font-mono font-semibold text-[11px]">180+ Commits</span>
            </div>

            {/* Simulated Contribution Matrix */}
            <div className="grid grid-cols-12 gap-1 py-1">
              {Array.from({ length: 48 }).map((_, i) => {
                const intensity = [
                  'bg-[#161B22] border border-[#30363D]',
                  'bg-[#0E4429]',
                  'bg-[#006D32]',
                  'bg-[#26A641]',
                  'bg-[#39D353]'
                ][(i * 7 + 3) % 5];
                return (
                  <div 
                    key={i} 
                    className={`w-full aspect-square rounded-[2px] ${intensity} transition-transform hover:scale-125`} 
                  />
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#8B949E] pt-1">
              <span>Less activity</span>
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#161B22] border border-[#30363D]" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#0E4429]" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#006D32]" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#26A641]" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#39D353]" />
              </div>
              <span>More activity</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-[#161B22] border border-[#30363D] p-2.5 rounded-lg">
              <span className="text-[10px] text-[#8B949E] block">Green Squares</span>
              <span className="text-[#2DA44E] font-bold font-mono text-xs mt-0.5">Authentic Graph</span>
            </div>
            <div className="bg-[#161B22] border border-[#30363D] p-2.5 rounded-lg">
              <span className="text-[10px] text-[#8B949E] block">Commit History</span>
              <span className="text-[#C9D1D9] font-mono font-semibold text-xs mt-0.5">Permanent Log</span>
            </div>
          </div>
        </div>
      );
    }

    // 4. Stars Promotion or Account with Stars
    if (sId.includes('star')) {
      return (
        <div className="space-y-4">
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-[#30363D]">
              <span className="text-[#8B949E] flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-[#E3B341]" />
                Stargazer Acceleration
              </span>
              <span className="text-[#E3B341] font-mono font-semibold text-[11px]">Organic Cadence</span>
            </div>

            {/* Interactive Repo Stargazer Box */}
            <div className="bg-[#0D1117] border border-[#30363D] p-3 rounded-lg flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[#58A6FF] font-mono">repository/awesome-project</div>
                <div className="text-[10px] text-[#8B949E] mt-0.5">High-retention stargazers from verified accounts</div>
              </div>
              <button 
                onClick={() => {
                  setIsStarring(true);
                  setSimulatedStars(s => s + 1);
                  setTimeout(() => setIsStarring(false), 600);
                }}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-md border transition-all ${
                  isStarring 
                    ? 'bg-[#E3B341] text-[#0D1117] border-[#E3B341]' 
                    : 'bg-[#21262D] text-[#C9D1D9] border-[#30363D] hover:bg-[#30363D]'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${isStarring ? 'fill-current' : 'text-[#E3B341] fill-[#E3B341]'}`} />
                <span className="font-mono">{simulatedStars}</span>
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#8B949E] text-[11px]">
                <span>Trending Discovery Score</span>
                <span className="text-[#2DA44E] font-mono font-bold">98.4%</span>
              </div>
              <div className="w-full bg-[#30363D] h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-[#2DA44E] to-[#E3B341] h-full w-[94%]" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-[#161B22] border border-[#30363D] p-2.5 rounded-lg">
              <span className="text-[10px] text-[#8B949E] block">Non-Drop Guarantee</span>
              <span className="text-[#2DA44E] font-semibold text-[11px]">Replacement Protected</span>
            </div>
            <div className="bg-[#161B22] border border-[#30363D] p-2.5 rounded-lg">
              <span className="text-[10px] text-[#8B949E] block">Delivery Mode</span>
              <span className="text-[#C9D1D9] font-semibold text-[11px]">Natural Drip-Feed</span>
            </div>
          </div>
        </div>
      );
    }

    // 5. Followers Service or Account with Followers
    if (sId.includes('follower')) {
      return (
        <div className="space-y-4">
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-[#30363D]">
              <span className="text-[#8B949E] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#BC8CFF]" />
                Developer Network Expansion
              </span>
              <span className="text-[#BC8CFF] font-mono font-semibold text-[11px]">Profile Authority</span>
            </div>

            <div className="space-y-2">
              {[
                { name: 'alex-dev-core', role: 'Full-Stack Engineer', badge: 'Active' },
                { name: 'sarah-cloud-ops', role: 'DevOps Architect', badge: 'Verified' },
                { name: 'chen-system-lab', role: 'OSS Contributor', badge: 'Aged' }
              ].map((user, i) => (
                <div key={i} className="flex items-center justify-between bg-[#0D1117] p-2 rounded border border-[#30363D] text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#30363D] flex items-center justify-center font-bold text-[10px] text-[#C9D1D9]">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-[#58A6FF] font-mono text-[11px] font-semibold">{user.name}</div>
                      <div className="text-[10px] text-[#8B949E]">{user.role}</div>
                    </div>
                  </div>
                  <span className="text-[9px] bg-[#21262D] text-[#8B949E] px-1.5 py-0.5 rounded border border-[#30363D]">
                    {user.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#161B22] border border-[#30363D] p-3 rounded-lg flex items-center justify-between text-xs">
            <span className="text-[#8B949E]">Follower Profile Integrity:</span>
            <span className="text-[#2DA44E] font-semibold">100% Real User Profiles</span>
          </div>
        </div>
      );
    }

    // 6. Forks Service or Account with Forks
    if (sId.includes('fork')) {
      return (
        <div className="space-y-4">
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-[#30363D]">
              <span className="text-[#8B949E] flex items-center gap-1.5">
                <GitFork className="w-3.5 h-3.5 text-[#2DA44E]" />
                Repository Branching Tree
              </span>
              <span className="text-[#2DA44E] font-mono font-semibold text-[11px]">Upstream Linked</span>
            </div>

            <div className="bg-[#0D1117] p-3 rounded border border-[#30363D] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#58A6FF] font-mono font-semibold">
                <GitBranch className="w-3.5 h-3.5 text-[#58A6FF]" />
                <span>main (upstream repository)</span>
              </div>
              <div className="pl-5 space-y-1.5 border-l border-[#30363D] text-[11px] text-[#8B949E] font-mono">
                <div className="flex items-center justify-between">
                  <span>├── dev-fork-cluster-01</span>
                  <span className="text-[#2DA44E] text-[10px]">Synced</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>├── dev-fork-cluster-02</span>
                  <span className="text-[#2DA44E] text-[10px]">Synced</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>└── dev-fork-cluster-03</span>
                  <span className="text-[#2DA44E] text-[10px]">Synced</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-[#161B22] border border-[#30363D] p-2.5 rounded-lg">
              <span className="text-[10px] text-[#8B949E] block">Open-Source Traction</span>
              <span className="text-[#58A6FF] font-semibold text-[11px]">High Discovery</span>
            </div>
            <div className="bg-[#161B22] border border-[#30363D] p-2.5 rounded-lg">
              <span className="text-[10px] text-[#8B949E] block">Delivery Method</span>
              <span className="text-[#C9D1D9] font-semibold text-[11px]">Direct Branching</span>
            </div>
          </div>
        </div>
      );
    }

    // 7. Achievement Badges (Pull Shark, Quickdraw, YOLO, etc.)
    if (sId.includes('achievement') || sId.includes('badge')) {
      return (
        <div className="space-y-4">
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-[#30363D]">
              <span className="text-[#8B949E] flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#D29922]" />
                Profile Achievements Showcase
              </span>
              <span className="text-[#2DA44E] font-bold text-[10px]">VERIFIED UNLOCKED</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-[#0D1117] border border-[#30363D] p-2.5 rounded-lg hover:border-[#58A6FF] transition-colors">
                <div className="text-xl mb-1">🦈</div>
                <div className="text-[11px] font-bold text-[#C9D1D9]">Pull Shark</div>
                <div className="text-[9px] text-[#8B949E]">Merged PRs</div>
              </div>
              <div className="bg-[#0D1117] border border-[#30363D] p-2.5 rounded-lg hover:border-[#E3B341] transition-colors">
                <div className="text-xl mb-1">⚡</div>
                <div className="text-[11px] font-bold text-[#C9D1D9]">Quickdraw</div>
                <div className="text-[9px] text-[#8B949E]">Fast Closure</div>
              </div>
              <div className="bg-[#0D1117] border border-[#30363D] p-2.5 rounded-lg hover:border-[#2DA44E] transition-colors">
                <div className="text-xl mb-1">🎯</div>
                <div className="text-[11px] font-bold text-[#C9D1D9]">YOLO</div>
                <div className="text-[9px] text-[#8B949E]">Merged Clean</div>
              </div>
            </div>
          </div>

          <div className="bg-[#161B22] border border-[#30363D] p-3 rounded-lg flex items-center justify-between text-xs">
            <span className="text-[#8B949E]">Showcase Position:</span>
            <span className="text-[#58A6FF] font-semibold">GitHub Profile Header</span>
          </div>
        </div>
      );
    }

    // 8. Bulk Accounts Service
    if (sId.includes('bulk')) {
      return (
        <div className="space-y-4">
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-[#30363D]">
              <span className="text-[#8B949E] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#58A6FF]" />
                Volume Multi-Account Matrix
              </span>
              <span className="text-[#2DA44E] font-mono font-semibold text-[11px]">100x Clean Pack</span>
            </div>

            <div className="bg-[#0D1117] p-2.5 rounded border border-[#30363D] font-mono text-[11px] text-[#8B949E] space-y-1">
              <div className="text-[#58A6FF] flex items-center justify-between">
                <span># Export Format: login:pass:email:emailpass</span>
                <span className="text-[#2DA44E]">Ready</span>
              </div>
              <div className="text-[#C9D1D9] truncate">gh_user_001:pass984:mail1@dev.io:pass984</div>
              <div className="text-[#C9D1D9] truncate">gh_user_002:pass211:mail2@dev.io:pass211</div>
              <div className="text-[#C9D1D9] truncate">gh_user_003:pass404:mail3@dev.io:pass404</div>
              <div className="text-[#8B949E] text-[10px]">... +97 verified accounts in bundle</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-[#161B22] border border-[#30363D] p-2.5 rounded-lg">
              <span className="text-[10px] text-[#8B949E] block">Format Delivery</span>
              <span className="text-[#C9D1D9] font-mono font-semibold text-[11px]">CSV / JSON / TXT</span>
            </div>
            <div className="bg-[#161B22] border border-[#30363D] p-2.5 rounded-lg">
              <span className="text-[10px] text-[#8B949E] block">Per-Account Unit Price</span>
              <span className="text-[#2DA44E] font-mono font-bold text-[11px]">$2.00 / Account</span>
            </div>
          </div>
        </div>
      );
    }

    // 9. Legion or Authena Specialized Accounts
    if (sId.includes('legion') || sId.includes('authena')) {
      const isLegion = sId.includes('legion');
      return (
        <div className="space-y-4">
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-[#30363D]">
              <span className="text-[#8B949E] flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#58A6FF]" />
                {isLegion ? 'Legion Runner Configuration' : 'Authena Compliance Profile'}
              </span>
              <span className="bg-[#1F6FEB]/20 text-[#58A6FF] font-bold px-2 py-0.5 rounded text-[10px]">
                PRE-CONFIGURED
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between bg-[#0D1117] p-2 rounded border border-[#30363D]">
                <span className="text-[#C9D1D9]">Multi-Tenant API Token</span>
                <span className="text-[#2DA44E] font-mono text-[11px]">Configured</span>
              </div>
              <div className="flex items-center justify-between bg-[#0D1117] p-2 rounded border border-[#30363D]">
                <span className="text-[#C9D1D9]">IP Reputation Audit</span>
                <span className="text-[#58A6FF] font-mono text-[11px]">Grade A+ Clean</span>
              </div>
              <div className="flex items-center justify-between bg-[#0D1117] p-2 rounded border border-[#30363D]">
                <span className="text-[#C9D1D9]">Workflow Runner Isolation</span>
                <span className="text-[#D29922] font-mono text-[11px]">Enabled</span>
              </div>
            </div>
          </div>

          <div className="bg-[#161B22] border border-[#30363D] p-3 rounded-lg flex items-center justify-between text-xs">
            <span className="text-[#8B949E]">Deployment Verification:</span>
            <span className="text-[#2DA44E] font-semibold">100% Tested &amp; Passed</span>
          </div>
        </div>
      );
    }

    // Default New Account / General
    return (
      <div className="space-y-4">
        <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#30363D]">
            <span className="text-[#8B949E] flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#2DA44E]" />
              Account Verification Audit
            </span>
            <span className="text-[#2DA44E] font-bold text-[10px] bg-[#2DA44E]/10 px-2 py-0.5 rounded border border-[#2DA44E]/30">
              CLEAN REGISTRATION
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between bg-[#0D1117] p-2 rounded border border-[#30363D]">
              <span className="text-[#C9D1D9]">Primary Mailbox Attached</span>
              <span className="text-[#2DA44E] font-semibold flex items-center gap-1">
                <Check className="w-3 h-3 text-[#2DA44E]" />
                100% Handover
              </span>
            </div>
            <div className="flex items-center justify-between bg-[#0D1117] p-2 rounded border border-[#30363D]">
              <span className="text-[#C9D1D9]">IP Footprint</span>
              <span className="text-[#58A6FF] font-semibold">Clean Residential</span>
            </div>
            <div className="flex items-center justify-between bg-[#0D1117] p-2 rounded border border-[#30363D]">
              <span className="text-[#C9D1D9]">2FA Setup Status</span>
              <span className="text-[#D29922] font-semibold">Ready for Binding</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-[#161B22] border border-[#30363D] p-2.5 rounded-lg">
            <span className="text-[10px] text-[#8B949E] block">Replacement Warranty</span>
            <span className="text-[#2DA44E] font-bold text-[11px]">48-Hour Guarantee</span>
          </div>
          <div className="bg-[#161B22] border border-[#30363D] p-2.5 rounded-lg">
            <span className="text-[10px] text-[#8B949E] block">Dispatch Time</span>
            <span className="text-[#C9D1D9] font-mono font-semibold text-[11px]">15–30 Mins</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative rounded-2xl bg-[#0D1117] border border-[#30363D] shadow-2xl overflow-hidden text-[#C9D1D9]">
      
      {/* Subtle Technical Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#58A6FF 1px, transparent 1px), linear-gradient(90deg, #58A6FF 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Terminal Window Top Bar */}
      <div className="bg-[#161B22] border-b border-[#30363D] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#EC6A5E]" />
          <div className="w-3 h-3 rounded-full bg-[#F5BF4F]" />
          <div className="w-3 h-3 rounded-full bg-[#62C554]" />
          <span className="ml-2 text-xs font-mono text-[#8B949E] flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#58A6FF]" />
            service-dispatch-engine.sh
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#1F6FEB]/20 text-[#58A6FF] border border-[#58A6FF]/30 font-mono">
            {service.id.slice(0, 14)}
          </span>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="flex items-center border-b border-[#30363D] bg-[#0D1117] px-4 pt-2 gap-2 text-xs font-medium">
        <button
          onClick={() => setActiveTab('preview')}
          className={`pb-2 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'preview'
              ? 'border-[#2DA44E] text-[#58A6FF] font-semibold'
              : 'border-transparent text-[#8B949E] hover:text-[#C9D1D9]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#2DA44E]" />
          Live Preview
        </button>
        <button
          onClick={() => setActiveTab('specs')}
          className={`pb-2 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'specs'
              ? 'border-[#2DA44E] text-[#58A6FF] font-semibold'
              : 'border-transparent text-[#8B949E] hover:text-[#C9D1D9]'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5 text-[#58A6FF]" />
          Specifications
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`pb-2 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'security'
              ? 'border-[#2DA44E] text-[#58A6FF] font-semibold'
              : 'border-transparent text-[#8B949E] hover:text-[#C9D1D9]'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#D29922]" />
          Security Handover
        </button>
      </div>

      {/* Main Interactive Visual Body */}
      <div className="p-5 relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === 'preview' && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {renderVisualContent()}
            </motion.div>
          )}

          {activeTab === 'specs' && (
            <motion.div
              key="specs"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-3 text-xs"
            >
              <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-3 space-y-2">
                <div className="text-[11px] font-bold text-[#58A6FF] uppercase tracking-wider">
                  Technical Checklist
                </div>
                {service.features.slice(0, 3).map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-[#C9D1D9]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2DA44E] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">{feat.title}: </strong>
                      <span className="text-[#8B949E]">{feat.description}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#161B22] border border-[#30363D] p-3 rounded-lg flex items-center justify-between">
                <span className="text-[#8B949E]">Current Base Price:</span>
                <span className="font-mono font-bold text-[#2DA44E] text-base">{selectedTierPrice || service.basePrice}</span>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-3 text-xs"
            >
              <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-3.5 space-y-2.5">
                <div className="flex items-center gap-2 text-[#2DA44E] font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#2DA44E]" />
                  48-Hour Replacement Guarantee
                </div>
                <p className="text-[#8B949E] text-[11px] leading-relaxed">
                  Every account is manually verified before delivery. If any credentials fail or present defect issues upon first login within 48 hours, our support team replaces the account immediately.
                </p>
                <div className="pt-2 border-t border-[#30363D] flex items-center justify-between text-[11px]">
                  <span className="text-[#C9D1D9]">Direct Escalation:</span>
                  <span className="text-[#58A6FF] font-mono">Telegram @EgSupport24</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info Bar */}
      <div className="bg-[#161B22] border-t border-[#30363D] px-5 py-3 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#2DA44E] animate-ping" />
          <span className="text-[11px] text-[#2DA44E] font-medium">Ready for Dispatch</span>
        </div>
        <div className="text-[11px] font-mono text-[#8B949E]">
          {selectedTierLabel || service.priceUnit}
        </div>
      </div>

    </div>
  );
};
