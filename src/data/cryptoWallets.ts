import { CryptoWallet } from '../types';

export const cryptoWallets: CryptoWallet[] = [
  {
    id: 'usdt-trc20',
    name: 'Tether USD',
    symbol: 'USDT (TRC-20)',
    displaySymbol: 'USDT',
    network: 'TRON (TRC-20)',
    networkBadge: 'TRC-20',
    address: 'TQkGnoSN5EaKnNpbXCV7cBdzTG7zYJT6rL',
    category: 'stablecoin',
    estRateUsd: 1.0,
    decimals: 2,
    popular: true,
    recommended: true,
    notes: 'Recommended: Fast transfers with low TRON network gas fees (~$1-2).'
  },
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    displaySymbol: 'BTC',
    network: 'Bitcoin Native (Mainnet)',
    networkBadge: 'Bitcoin',
    address: '1FcThSprBdA4RQ6bZegw4UyYZMys1NbD9w',
    category: 'major',
    estRateUsd: 95000,
    decimals: 6,
    popular: true,
    notes: 'Send only native Bitcoin (BTC) to this address. Requires 1 network confirmation.'
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    displaySymbol: 'ETH',
    network: 'Ethereum (ERC-20 / Native)',
    networkBadge: 'ERC-20',
    address: '0x4b228fd7190372982df439b0235f296ddebe6dc2',
    category: 'major',
    estRateUsd: 2800,
    decimals: 5,
    popular: true,
    notes: 'Native Ethereum (ETH) on the Ethereum Mainnet.'
  },
  {
    id: 'usdt-bep20',
    name: 'Tether USD (BSC)',
    symbol: 'USDT (BEP-20)',
    displaySymbol: 'USDT',
    network: 'BNB Smart Chain (BEP-20)',
    networkBadge: 'BEP-20',
    address: '0x4b228fd7190372982df439b0235f296ddebe6dc2',
    category: 'stablecoin',
    estRateUsd: 1.0,
    decimals: 2,
    popular: true,
    notes: 'Ultra-low gas fees on Binance Smart Chain (BEP-20).'
  },
  {
    id: 'usdt-erc20',
    name: 'Tether USD (Ethereum)',
    symbol: 'USDT (ERC-20)',
    displaySymbol: 'USDT',
    network: 'Ethereum (ERC-20)',
    networkBadge: 'ERC-20',
    address: '0x4b228fd7190372982df439b0235f296ddebe6dc2',
    category: 'stablecoin',
    estRateUsd: 1.0,
    decimals: 2,
    notes: 'Tether USDT on Ethereum network (ERC-20).'
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    displaySymbol: 'SOL',
    network: 'Solana SPL (Native)',
    networkBadge: 'Solana SPL',
    address: '3iPS8xWurfFL6PPSR1czKN6mcAZSAhBa5Bny9TXZYmfg',
    category: 'major',
    estRateUsd: 190,
    decimals: 4,
    popular: true,
    notes: 'Near-instant settlement (<10 seconds) on the Solana network.'
  },
  {
    id: 'ltc',
    name: 'Litecoin',
    symbol: 'LTC',
    displaySymbol: 'LTC',
    network: 'Litecoin Native (Mainnet)',
    networkBadge: 'Litecoin',
    address: 'LcoRbiEKpYDxEHQrtUsiP2RU1MLQmNYnGy',
    category: 'altcoin',
    estRateUsd: 110,
    decimals: 4,
    popular: true,
    notes: 'Fast confirmations and extremely low transaction fees.'
  },
  {
    id: 'bnb',
    name: 'BNB (Binance Coin)',
    symbol: 'BNB',
    displaySymbol: 'BNB',
    network: 'BNB Smart Chain (BEP-20)',
    networkBadge: 'BEP-20',
    address: '0x4b228fd7190372982df439b0235f296ddebe6dc2',
    category: 'major',
    estRateUsd: 650,
    decimals: 4,
    notes: 'Native BNB coin on the BNB Smart Chain (BSC).'
  },
  {
    id: 'usdc-erc20',
    name: 'USD Coin (ERC-20)',
    symbol: 'USDC (ERC-20)',
    displaySymbol: 'USDC',
    network: 'Ethereum (ERC-20)',
    networkBadge: 'ERC-20',
    address: '0x4b228fd7190372982df439b0235f296ddebe6dc2',
    category: 'stablecoin',
    estRateUsd: 1.0,
    decimals: 2,
    notes: 'USD Coin (USDC) on Ethereum ERC-20 standard.'
  },
  {
    id: 'usdc-bep20',
    name: 'USD Coin (BEP-20)',
    symbol: 'USDC (BEP-20)',
    displaySymbol: 'USDC',
    network: 'BNB Smart Chain (BEP-20)',
    networkBadge: 'BEP-20',
    address: '0x4b228fd7190372982df439b0235f296ddebe6dc2',
    category: 'stablecoin',
    estRateUsd: 1.0,
    decimals: 2,
    notes: 'USD Coin (USDC) on BNB Smart Chain (BEP-20).'
  },
  {
    id: 'trx',
    name: 'TRON',
    symbol: 'TRX',
    displaySymbol: 'TRX',
    network: 'TRON Native (TRC-20 / TRC-10)',
    networkBadge: 'TRON',
    address: 'TQkGnoSN5EaKnNpbXCV7cBdzTG7zYJT6rL',
    category: 'altcoin',
    estRateUsd: 0.25,
    decimals: 2,
    notes: 'Native TRX token on the TRON network.'
  },
  {
    id: 'doge',
    name: 'Dogecoin',
    symbol: 'DOGE',
    displaySymbol: 'DOGE',
    network: 'Dogecoin Native (Mainnet)',
    networkBadge: 'Dogecoin',
    address: 'D8Az7EYHRMvvtGM1X44eVFyrmEayt3H6h7',
    category: 'altcoin',
    estRateUsd: 0.28,
    decimals: 2,
    notes: 'Native Dogecoin blockchain address.'
  }
];

export const getCryptoWalletById = (id: string): CryptoWallet | undefined => {
  return cryptoWallets.find((w) => w.id === id);
};

export const getCryptoWalletsByCategory = (category?: 'stablecoin' | 'major' | 'altcoin'): CryptoWallet[] => {
  if (!category) return cryptoWallets;
  return cryptoWallets.filter((w) => w.category === category);
};
