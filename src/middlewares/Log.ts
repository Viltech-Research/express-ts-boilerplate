/**
 * 
 * @author Viltech
 */

import * as fs from 'fs';
import * as path from 'path';

class Log {
    public baseDir: string;
    public fileName: string;
    public linePrefix: string;

    public today: Date = new Date();

    constructor() {
        let _dateString = `${this.today.getFullYear()}-${this.today.getMonth() + 1}-${this.today.getDate()}`;
        let _timeString = `${this.today.getHours()}:${this.today.getMinutes()}:${this.today.getSeconds()}`;

        this.baseDir = path.join(__dirname, '../../logs/');

        this.fileName = `${_dateString}.log`;
        this.linePrefix = `[${_dateString} ${_timeString}]`;
    }

    // Add INFO prefix to the log
    public info(_string: string): void {
        this.addLog('INFO', _string);
    }

    // Add WARNING prefix to the log
    public warning(_string: string): void {
        this.addLog('WARNING', _string);
    }

    // Add ERROR prefix to the log
    public error(_string: string): void {
        // Line break and show the first line
        console.log('\x1b[31m%s\x1b[0m', _string.split('\n')[0]);
        this.addLog('ERROR', _string);
    }

    // Add custom prefix to the log
    public custom(_prefix: string, _string: string): void {
        this.addLog(_prefix, _string);
    }

    /**
     * Creates the file if doesnt exist, and
     * append the log kind & string into file
     */
    private addLog(_kind: string, _string: string): void {
        const _that = this;
        _kind = _kind.toUpperCase();

        fs.open(`${_that.baseDir}${_that.fileName}`, 'a', (_err, _fileDescriptor) => {
            if(!_err && _fileDescriptor) {
                // Append to file and close it
                fs.appendFile(_fileDescriptor, `${_that.linePrefix} [${_kind}] ${_string}\n`, (_err) => {
                    if(!_err) {
                        fs.close(_fileDescriptor, (_err) => {
                            if(!_err) {
                                return;
                            } else {
                                return console.log('\x1b[31m%s\x1b[0m', 'Error closing log file that was being appended');
                            }
                        });
                    } else {
                        return console.log('\x1b[31m%s\x1b[0m', 'Error appending to the log file');
                    }
                });
            } else {
                return console.log('\x1b[31m%s\x1b[0m', 'Error cloudn\'t open the log file for appending');
            }
        });
    }

    /**
     * Deletes the log files older than 'X' days
     * 
     * Note: 'X' is defined in .env file
     */
    public clean(): void {
        //
    }
}

export default new Log;