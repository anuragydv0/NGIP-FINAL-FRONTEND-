import { FaqItem } from '../types';

export const mockFaqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What is the Country Growth Index (CGI)?',
    answer: 'The Country Growth Index (CGI) is a proprietary methodology that aggregates 186 macro-economic indicators into a single score out of 100, providing a standardized measure of a nation\'s economic trajectory and investment potential.'
  },
  {
    id: 'faq-2',
    question: 'How is the risk band calculated?',
    answer: 'Risk bands are determined by analyzing market volatility, political stability indices, debt-to-GDP ratios, and currency fluctuation history. Countries and instruments are dynamically categorized into Low, Moderate, Elevated, or High.'
  },
  {
    id: 'faq-3',
    question: 'What is the withdrawal policy?',
    answer: 'Withdrawals are processed within 1-2 business days. Note that standard banking clearing times may apply depending on your linked bank account and region.'
  },
  {
    id: 'faq-4',
    question: 'How frequently is data updated?',
    answer: 'Market instrument prices are delayed by 15 minutes. Economic indicators and CGI scores are updated weekly or whenever official government data releases occur.'
  },
  {
    id: 'faq-5',
    question: 'How is my data secured?',
    answer: 'We use bank-grade 256-bit TLS encryption for all data in transit and rest. Our infrastructure is independently audited, and we enforce strict data residency compliance.'
  },
  {
    id: 'faq-6',
    question: 'How do I contact support?',
    answer: 'Premium accounts receive dedicated relationship managers. Individual accounts can reach support 24/5 via the secure messaging center or by emailing support@ngip.io.'
  }
];
