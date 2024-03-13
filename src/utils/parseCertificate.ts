export type Document = {
  commonName: string,
  issuerName: string,
  validFrom: string,
  validTo: string,
};

abstract class IParsedInfo {
  certification: string[] = [];

  constructor(certification: string) {
    this.certification = certification.split('');
  };

  abstract getResult(): Document;
}

export class ParsedInfo implements IParsedInfo {
  certification: string[];

  constructor(certification: string) {
    this.certification = certification.split('\n').map(el => el.trim());
  }

  private _getCommonNames(): string[] {
    const res = [];

    for (let i = 0; i < this.certification.length; i += 1) {
      if (this.certification[i].includes('commonName')) {
        res.push(this.certification[i + 1]);
      }
    }

    return res;
  }

  private _extractNames(): { commonName: string, issuerName: string, } {
    const [issuerName, commonName] = this._getCommonNames().map(name => name.split(':')[1].trim());

    return { commonName, issuerName };
  }

  private _getValidityPeriod(): string[] {
    return this.certification.filter((element) => element.includes('UTCTime'));
  }

  private _extractDates() {
    const [validFrom, validTo] = this._getValidityPeriod().map(time => time.split(': ')[1].split(' ')[0]);

    return { validFrom, validTo };
  }

  getResult(): Document {
    return {
      ...this._extractNames(),
      ...this._extractDates(),
    };
  }
}
