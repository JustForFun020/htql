import { message } from 'antd';
import { Report } from 'powerbi-client';

export const refreshPowerBiDataset = async (
  report: Report,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setLoading(true);
  try {
    const res = await fetch(
      `https://api.powerbi.com/v1.0/myorg/datasets/${process.env.POWER_BI_DATASET_ID}/refreshes`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.POWER_BI_ACCESS_TOKEN}`,
        },
      },
    );
    if (res.ok) {
      report
        .refresh()
        .then(() => {
          console.log('Report refreshed');
        })
        .catch((error) => {
          message.error(error.detailedMessage);
        });
    } else {
      console.error('Error refreshing dataset:', res.statusText);
    }
    setLoading(false);
  } catch (error) {
    console.error('Error refreshing dataset:', error);
    setLoading(false);
  }
};
