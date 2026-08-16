import { 
  Terminal, 
  Clock, 
  Activity, 
  GraduationCap, 
  Layers, 
  Star, 
  Users, 
  GitFork, 
  Eye, 
  FolderGit2, 
  History, 
  Award, 
  Bot, 
  ShieldCheck, 
  GitPullRequest, 
  FileCode2, 
  Sparkles,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface ProductVisualProps {
  serviceId: string;
  category?: 'accounts' | 'promotion';
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
}

export const getServiceSKU = (serviceId: string): string => {
  const map: Record<string, string> = {
    'buy-new-github-accounts': 'SKU: GHA-NEW-01',
    'buy-aged-github-accounts': 'SKU: GHA-AGED-02',
    'aged-github-accounts': 'SKU: GHA-AGED-02',
    'buy-github-active-account': 'SKU: GHA-ACT-03',
    'buy-github-student-account': 'SKU: GHA-STU-04',
    'buy-github-student-developer-pack-account': 'SKU: GHA-STU-04',
    'buy-bulk-github-accounts': 'SKU: GHA-BLK-05',
    'buy-github-accounts-with-stars': 'SKU: GHA-STR-06',
    'github-accounts-with-stars': 'SKU: GHA-STR-06',
    'buy-github-account-with-followers': 'SKU: GHA-FOL-07',
    'github-account-with-followers': 'SKU: GHA-FOL-07',
    'buy-github-accounts-with-contributions': 'SKU: GHA-CNT-08',
    'buy-github-account-with-badges': 'SKU: GHA-BDG-09',
    'buy-github-account-with-repositories': 'SKU: GHA-REP-10',
    'buy-github-account-with-copilot': 'SKU: GHA-COP-11',
    'buy-aged-github-account-with-activity': 'SKU: GHA-AGACT-12',
    'buy-github-organization-accounts': 'SKU: GHA-ORG-13',
    'buy-github-enterprise-accounts': 'SKU: GHA-ENT-14',
    'buy-github-accounts-instant-delivery': 'SKU: GHA-INST-15',
    // Promotion
    'buy-github-stars': 'SKU: GHP-STR-21',
    'buy-github-followers': 'SKU: GHP-FOL-22',
    'buy-github-forks': 'SKU: GHP-FRK-23',
    'buy-github-watchers': 'SKU: GHP-WCH-24',
    'buy-github-repositories': 'SKU: GHP-REP-25',
    'buy-github-commit-history': 'SKU: GHP-CMT-26',
    'buy-github-profile-readme': 'SKU: GHP-RDM-27',
    'buy-github-achievements': 'SKU: GHP-ACH-28',
  };
  return map[serviceId] || `SKU: GH-${serviceId.slice(0, 8).toUpperCase()}`;
};

export const getServiceStockStatus = (serviceId: string) => {
  return {
    inStock: true,
    label: 'In Stock',
    dispatchTime: serviceId.includes('aged') || serviceId.includes('student') ? '15–45 Mins' : '15–30 Mins',
    unitsRemaining: 'Available for immediate dispatch'
  };
};

export const ProductVisual = ({ serviceId, category, size = 'md', className = '' }: ProductVisualProps) => {
  // Determine visual style based on service id
  const getVisualConfig = () => {
    const sId = serviceId.toLowerCase();

    if (sId.includes('student')) {
      return {
        icon: GraduationCap,
        bgGradient: 'from-[#0969DA]/10 via-[#0969DA]/5 to-transparent',
        borderColor: 'border-[#0969DA]/30',
        badgeBg: 'bg-[#DDF4FF] text-[#0969DA]',
        iconColor: 'text-[#0969DA]',
        label: 'Student Pack Verified',
        sublabel: '$200K+ Dev Tools',
        accentTag: 'Academic EDU'
      };
    }

    if (sId.includes('aged')) {
      return {
        icon: Clock,
        bgGradient: 'from-[#9A6700]/10 via-[#9A6700]/5 to-transparent',
        borderColor: 'border-[#D29922]/30',
        badgeBg: 'bg-[#FFF8C5] text-[#9A6700]',
        iconColor: 'text-[#9A6700]',
        label: 'Platform Seniority',
        sublabel: 'Established Tenure',
        accentTag: 'Historical Trust'
      };
    }

    if (sId.includes('star')) {
      return {
        icon: Star,
        bgGradient: 'from-[#E3B341]/10 via-[#E3B341]/5 to-transparent',
        borderColor: 'border-[#E3B341]/40',
        badgeBg: 'bg-[#FFF8C5] text-[#9A6700]',
        iconColor: 'text-[#E3B341]',
        label: 'Social Discovery',
        sublabel: 'Organic Stargazers',
        accentTag: 'Repo Traction'
      };
    }

    if (sId.includes('follower')) {
      return {
        icon: Users,
        bgGradient: 'from-[#8250DF]/10 via-[#8250DF]/5 to-transparent',
        borderColor: 'border-[#8250DF]/30',
        badgeBg: 'bg-[#FBEFFF] text-[#8250DF]',
        iconColor: 'text-[#8250DF]',
        label: 'Developer Reach',
        sublabel: 'Public Network',
        accentTag: 'Profile Authority'
      };
    }

    if (sId.includes('fork')) {
      return {
        icon: GitFork,
        bgGradient: 'from-[#1F883D]/10 via-[#1F883D]/5 to-transparent',
        borderColor: 'border-[#1F883D]/30',
        badgeBg: 'bg-[#E1F0DA] text-[#1A7F37]',
        iconColor: 'text-[#1A7F37]',
        label: 'Open Source Forks',
        sublabel: 'Branching Traction',
        accentTag: 'Viral Metric'
      };
    }

    if (sId.includes('watcher')) {
      return {
        icon: Eye,
        bgGradient: 'from-[#0969DA]/10 via-[#0969DA]/5 to-transparent',
        borderColor: 'border-[#0969DA]/30',
        badgeBg: 'bg-[#DDF4FF] text-[#0969DA]',
        iconColor: 'text-[#0969DA]',
        label: 'Project Watchers',
        sublabel: 'Release Observers',
        accentTag: 'Active Alerts'
      };
    }

    if (sId.includes('bulk')) {
      return {
        icon: Layers,
        bgGradient: 'from-[#24292F]/10 via-[#24292F]/5 to-transparent',
        borderColor: 'border-[#24292F]/30',
        badgeBg: 'bg-[#F6F8FA] text-[#24292F]',
        iconColor: 'text-[#24292F]',
        label: 'Volume Multi-Pack',
        sublabel: 'Batch Credentials',
        accentTag: 'CI/CD Matrix'
      };
    }

    if (sId.includes('commit') || sId.includes('active') || sId.includes('contribution')) {
      return {
        icon: Activity,
        bgGradient: 'from-[#2DA44E]/10 via-[#2DA44E]/5 to-transparent',
        borderColor: 'border-[#2DA44E]/30',
        badgeBg: 'bg-[#E1F0DA] text-[#1A7F37]',
        iconColor: 'text-[#2DA44E]',
        label: 'Green Contributions',
        sublabel: 'Heatmap History',
        accentTag: 'Commit Matrix'
      };
    }

    if (sId.includes('badge') || sId.includes('achievement')) {
      return {
        icon: Award,
        bgGradient: 'from-[#BF8700]/10 via-[#BF8700]/5 to-transparent',
        borderColor: 'border-[#BF8700]/30',
        badgeBg: 'bg-[#FFF8C5] text-[#9A6700]',
        iconColor: 'text-[#BF8700]',
        label: 'Trophy Showcase',
        sublabel: 'Pull Shark / Quickdraw',
        accentTag: 'Verified Badge'
      };
    }

    if (sId.includes('repo')) {
      return {
        icon: FolderGit2,
        bgGradient: 'from-[#24292F]/10 via-[#24292F]/5 to-transparent',
        borderColor: 'border-[#24292F]/30',
        badgeBg: 'bg-[#F6F8FA] text-[#24292F]',
        iconColor: 'text-[#24292F]',
        label: 'Clean Codebase',
        sublabel: 'Source & Licensing',
        accentTag: 'Git Repository'
      };
    }

    if (sId.includes('copilot')) {
      return {
        icon: Bot,
        bgGradient: 'from-[#6E40C9]/10 via-[#6E40C9]/5 to-transparent',
        borderColor: 'border-[#6E40C9]/30',
        badgeBg: 'bg-[#FBEFFF] text-[#6E40C9]',
        iconColor: 'text-[#6E40C9]',
        label: 'AI Pair Programmer',
        sublabel: 'Model Assistance',
        accentTag: 'Copilot Ready'
      };
    }

    if (sId.includes('enterprise') || sId.includes('org')) {
      return {
        icon: ShieldCheck,
        bgGradient: 'from-[#0969DA]/10 via-[#0969DA]/5 to-transparent',
        borderColor: 'border-[#0969DA]/30',
        badgeBg: 'bg-[#DDF4FF] text-[#0969DA]',
        iconColor: 'text-[#0969DA]',
        label: 'Enterprise Infrastructure',
        sublabel: 'Organization Owner',
        accentTag: 'Enterprise Tier'
      };
    }

    if (sId.includes('usa') || sId.includes('uk')) {
      return {
        icon: Terminal,
        bgGradient: 'from-[#0969DA]/10 via-[#0969DA]/5 to-transparent',
        borderColor: 'border-[#0969DA]/30',
        badgeBg: 'bg-[#DDF4FF] text-[#0969DA]',
        iconColor: 'text-[#0969DA]',
        label: 'Geo-Targeted Profile',
        sublabel: 'USA / UK Residential IP',
        accentTag: 'Geo Verified'
      };
    }

    if (sId.includes('verified') || sId.includes('developer')) {
      return {
        icon: ShieldCheck,
        bgGradient: 'from-[#1A7F37]/10 via-[#1A7F37]/5 to-transparent',
        borderColor: 'border-[#1A7F37]/30',
        badgeBg: 'bg-[#E1F0DA] text-[#1A7F37]',
        iconColor: 'text-[#1A7F37]',
        label: 'Verified Developer',
        sublabel: 'High-Trust Clearance',
        accentTag: 'Developer Verified'
      };
    }

    // Default New Account / General
    return {
      icon: Terminal,
      bgGradient: 'from-[#2DA44E]/10 via-[#2DA44E]/5 to-transparent',
      borderColor: 'border-[#D0D7DE]',
      badgeBg: 'bg-[#F6F8FA] text-[#24292F]',
      iconColor: 'text-[#2DA44E]',
      label: 'Verified Profile',
      sublabel: 'Full Mailbox Handover',
      accentTag: '100% Verified'
    };
  };

  const config = getVisualConfig();
  const IconComponent = config.icon;

  if (size === 'sm') {
    return (
      <div className={`relative w-10 h-10 rounded-lg bg-gradient-to-br ${config.bgGradient} border ${config.borderColor} flex items-center justify-center shrink-0 ${className}`}>
        <IconComponent className={`w-5 h-5 ${config.iconColor}`} />
      </div>
    );
  }

  if (size === 'md') {
    return (
      <div className={`relative w-full h-36 rounded-lg bg-gradient-to-br ${config.bgGradient} bg-white border ${config.borderColor} p-4 flex flex-col justify-between overflow-hidden group-hover:border-[#24292F] transition-all ${className}`}>
        
        {/* Subtle grid pattern inside product box */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#24292F 1px, transparent 1px)`,
            backgroundSize: '12px 12px'
          }}
        />

        <div className="flex items-center justify-between z-10">
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${config.badgeBg} border-current/20`}>
            {config.accentTag}
          </span>
          <span className="text-[10px] font-mono text-[#57606A]">
            {getServiceSKU(serviceId)}
          </span>
        </div>

        <div className="flex items-center space-x-3 z-10 my-auto">
          <div className="w-11 h-11 rounded-lg bg-white border border-[#D0D7DE] shadow-xs flex items-center justify-center shrink-0">
            <IconComponent className={`w-6 h-6 ${config.iconColor}`} />
          </div>
          <div>
            <div className="text-xs font-bold text-[#24292F]">
              {config.label}
            </div>
            <div className="text-[11px] text-[#57606A]">
              {config.sublabel}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-[#57606A] border-t border-[#D0D7DE]/40 pt-1.5 z-10">
          <span className="flex items-center text-[#1A7F37] font-medium">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            48h Warranty Included
          </span>
          <span className="font-mono">
            Direct Dispatch
          </span>
        </div>
      </div>
    );
  }

  // Large / Hero
  return (
    <div className={`relative w-full rounded-xl bg-gradient-to-br ${config.bgGradient} bg-white border ${config.borderColor} p-6 overflow-hidden ${className}`}>
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#24292F 1px, transparent 1px)`,
          backgroundSize: '16px 16px'
        }}
      />

      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 z-10 relative">
        <div className="flex items-center space-x-2">
          <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded border ${config.badgeBg} border-current/20`}>
            {config.accentTag}
          </span>
          <span className="text-xs font-mono text-[#57606A] bg-[#F6F8FA] px-2 py-1 rounded border border-[#D0D7DE]">
            {getServiceSKU(serviceId)}
          </span>
        </div>
        <div className="flex items-center space-x-1.5 text-xs text-[#1A7F37] font-semibold bg-[#E1F0DA] px-2.5 py-1 rounded-full border border-[#2DA44E]/30">
          <span className="w-2 h-2 rounded-full bg-[#2DA44E] animate-pulse"></span>
          <span>In Stock — Ships in 15–30 Mins</span>
        </div>
      </div>

      <div className="flex items-center space-x-4 my-2 z-10 relative">
        <div className="w-14 h-14 rounded-xl bg-white border border-[#D0D7DE] shadow-xs flex items-center justify-center shrink-0">
          <IconComponent className={`w-8 h-8 ${config.iconColor}`} />
        </div>
        <div>
          <div className="text-sm sm:text-base font-extrabold text-[#24292F]">
            {config.label}
          </div>
          <div className="text-xs text-[#57606A] mt-0.5">
            {config.sublabel} • Full Mailbox Credentials &amp; 48-Hour Guarantee
          </div>
        </div>
      </div>
    </div>
  );
};
