/** @type {import('next').NextConfig} */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  transpilePackages: [
    'antd',
    'rc-util',
    '@babel/runtime',
    '@ant-design/icons',
    '@ant-design/icons-svg',
    'rc-pagination',
    'rc-picker',
    'rc-tree',
    'rc-table',
  ],
  env: {
    POWER_BI_ACCESS_TOKEN: process.env.POWER_BI_ACCESS_TOKEN,
    POWER_BI_REPORT_ID: process.env.POWER_BI_REPORT_ID,
    POWER_BI_DATASET_ID: process.env.POWER_BI_DATASET_ID,
    POWER_BI_EMBED_CONFIG: process.env.POWER_BI_EMBED_CONFIG,
  },
};

export default nextConfig;
