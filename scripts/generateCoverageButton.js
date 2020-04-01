const fs = require('fs');

try {
  const nycCoverageReport = require('../coverage/boondoggle-ui/coverage-summary.json');

  if (nycCoverageReport) {
    const pct = nycCoverageReport.total.lines.pct;
    let color = 'brightgreen';

    if (pct <= 20) {
      color = 'red';
    } else if (pct <= 40) {
      color = 'orange';
    } else if (pct <= 70) {
      color = 'yellow';
    } else if (pct <= 90) {
      color = 'green';
    } else if (pct === 'Unknown') {
      color = 'lightgrey'
    }

    fs.writeFileSync(`${process.cwd()}/coverage-badge.json`, JSON.stringify({
      schemaVersion: 1,
      label: 'coverage',
      message: pct === 'Unknown' ? 'unknown' : pct + '%',
      color: color
    }, undefined, 2));
  } else {
    throw new Error('Coverage summary contents could not be parsed.');
  }
} catch (e) {
  console.error('Unable to generate shields.io-compatible badge.', e);
  fs.writeFileSync(`${process.cwd()}/coverage-badge.json`, JSON.stringify({
    schemaVersion: 1,
    label: 'coverage',
    message: 'unknown',
    color: 'lightgrey'
  }, undefined, 2));
}
