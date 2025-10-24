import fs from 'fs/promises';
import { vehicleData } from '../data/vehicleData.js';

async function generate() {
  const lines = [];
  for (const brand of Object.keys(vehicleData)) {
    const years = vehicleData[brand] || {};
    for (const year of Object.keys(years)) {
      const models = years[year] || {};
      for (const model of Object.keys(models)) {
        lines.push(`${brand},${year},${model}`);
      }
    }
  }

  const outUrl = new URL('../data/vehicleData_flat.txt', import.meta.url);
  await fs.writeFile(outUrl, lines.join('\n'), 'utf8');
  console.log('Wrote', lines.length, 'lines to', outUrl.pathname);
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
