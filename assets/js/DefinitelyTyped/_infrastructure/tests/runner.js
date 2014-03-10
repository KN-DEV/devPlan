var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DefinitelyTyped;
(function (DefinitelyTyped) {
    (function (TestManager) {
        var path = require('path');

        TestManager.DEFAULT_TSC_VERSION = "0.9.1.1";

        function endsWith(str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        }

        var Tsc = (function () {
            function Tsc() {
            }
            Tsc.run = function (tsfile, options, callback) {
                options = options || {};
                options.tscVersion = options.tscVersion || TestManager.DEFAULT_TSC_VERSION;
                if (typeof options.checkNoImplicitAny === "undefined") {
                    options.checkNoImplicitAny = true;
                }
                if (typeof options.useTscParams === "undefined") {
                    options.useTscParams = true;
                }

                if (!IO.fileExists(tsfile)) {
                    throw new Error(tsfile + " not exists");
                }

                var tscPath = './_infrastructure/tests/typescript/' + options.tscVersion + '/tsc.js';
                if (!IO.fileExists(tscPath)) {
                    throw new Error(tscPath + ' is not exists');
                }
                var command = 'node ' + tscPath + ' --module commonjs ';
                if (options.useTscParams && IO.fileExists(tsfile + '.tscparams')) {
                    command += '@' + tsfile + '.tscparams';
                } else if (options.checkNoImplicitAny) {
                    command += '--noImplicitAny';
                }
                Exec.exec(command, [tsfile], function (execResult) {
                    callback(execResult);
                });
            };
            return Tsc;
        })();

        var Test = (function () {
            function Test(suite, tsfile, options) {
                this.suite = suite;
                this.tsfile = tsfile;
                this.options = options;
            }
            Test.prototype.run = function (callback) {
                var _this = this;
                Tsc.run(this.tsfile.filePathWithName, this.options, function (execResult) {
                    var testResult = new TestResult();
                    testResult.hostedBy = _this.suite;
                    testResult.targetFile = _this.tsfile;
                    testResult.options = _this.options;

                    testResult.stdout = execResult.stdout;
                    testResult.stderr = execResult.stderr;
                    testResult.exitCode = execResult.exitCode;

                    callback(testResult);
                });
            };
            return Test;
        })();

        var Timer = (function () {
            function Timer() {
                this.time = 0;
            }
            Timer.prototype.start = function () {
                this.time = 0;
                this.startTime = this.now();
            };

            Timer.prototype.now = function () {
                return Date.now();
            };

            Timer.prototype.end = function () {
                this.time = (this.now() - this.startTime) / 1000;
                this.asString = Timer.prettyDate(this.startTime, this.now());
            };

            Timer.prettyDate = function (date1, date2) {
                var diff = ((date2 - date1) / 1000), day_diff = Math.floor(diff / 86400);

                if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31)
                    return;

                return (day_diff == 0 && (diff < 60 && (diff + " seconds") || diff < 120 && "1 minute" || diff < 3600 && Math.floor(diff / 60) + " minutes" || diff < 7200 && "1 hour" || diff < 86400 && Math.floor(diff / 3600) + " hours") || day_diff == 1 && "Yesterday" || day_diff < 7 && day_diff + " days" || day_diff < 31 && Math.ceil(day_diff / 7) + " weeks");
            };
            return Timer;
        })();
        TestManager.Timer = Timer;

        var File = (function () {
            function File(baseDir, filePathWithName) {
                this.baseDir = baseDir;
                this.filePathWithName = filePathWithName;
                var dirName = path.dirname(this.filePathWithName.substr(this.baseDir.length + 1)).replace('\\', '/');
                this.dir = dirName.split('/')[0];
                this.file = path.basename(this.filePathWithName, '.ts');
                this.ext = path.extname(this.filePathWithName);
            }
            Object.defineProperty(File.prototype, "formatName", {
                get: function () {
                    var dirName = path.dirname(this.filePathWithName.substr(this.baseDir.length + 1)).replace('\\', '/');
                    return this.dir + ((dirName.split('/').length > 1) ? '/-/' : '/') + this.file + this.ext;
                },
                enumerable: true,
                configurable: true
            });
            return File;
        })();
        TestManager.File = File;

        var TestResult = (function () {
            function TestResult() {
            }
            Object.defineProperty(TestResult.prototype, "success", {
                get: function () {
                    return this.exitCode === 0;
                },
                enumerable: true,
                configurable: true
            });
            return TestResult;
        })();
        TestManager.TestResult = TestResult;

        

        

        var DefaultTestReporter = (function () {
            function DefaultTestReporter(print) {
                this.print = print;
            }
            DefaultTestReporter.prototype.printPositiveCharacter = function (index, testResult) {
                this.print.out('\33[36m\33[1m' + '.' + '\33[0m');

                this.printBreakIfNeeded(index);
            };

            DefaultTestReporter.prototype.printNegativeCharacter = function (index, testResult) {
                this.print.out("x");

                this.printBreakIfNeeded(index);
            };

            DefaultTestReporter.prototype.printBreakIfNeeded = function (index) {
                if (index % this.print.WIDTH === 0) {
                    this.print.printBreak();
                }
            };
            return DefaultTestReporter;
        })();

        var Print = (function () {
            function Print(version, typings, tests, tsFiles) {
                this.version = version;
                this.typings = typings;
                this.tests = tests;
                this.tsFiles = tsFiles;
                this.WIDTH = 77;
            }
            Print.prototype.out = function (s) {
                process.stdout.write(s);
                return this;
            };

            Print.prototype.repeat = function (s, times) {
                return new Array(times + 1).join(s);
            };

            Print.prototype.printHeader = function () {
                this.out('=============================================================================\n');
                this.out('                    \33[36m\33[1mDefinitelyTyped test runner 0.4.0\33[0m\n');
                this.out('=============================================================================\n');
                this.out(' \33[36m\33[1mTypescript version:\33[0m ' + this.version + '\n');
                this.out(' \33[36m\33[1mTypings           :\33[0m ' + this.typings + '\n');
                this.out(' \33[36m\33[1mTests             :\33[0m ' + this.tests + '\n');
                this.out(' \33[36m\33[1mTypeScript files  :\33[0m ' + this.tsFiles + '\n');
            };

            Print.prototype.printSuiteHeader = function (title) {
                var left = Math.floor((this.WIDTH - title.length) / 2) - 1;
                var right = Math.ceil((this.WIDTH - title.length) / 2) - 1;
                this.out(this.repeat("=", left)).out(" \33[34m\33[1m");
                this.out(title);
                this.out("\33[0m ").out(this.repeat("=", right)).printBreak();
            };

            Print.prototype.printDiv = function () {
                this.out('-----------------------------------------------------------------------------\n');
            };

            Print.prototype.printBoldDiv = function () {
                this.out('=============================================================================\n');
            };

            Print.prototype.printErrorsHeader = function () {
                this.out('=============================================================================\n');
                this.out('                    \33[34m\33[1mErrors in files\33[0m \n');
                this.out('=============================================================================\n');
            };

            Print.prototype.printErrorsForFile = function (testResult) {
                this.out('----------------- For file:' + testResult.targetFile.formatName);
                this.printBreak().out(testResult.stderr).printBreak();
            };

            Print.prototype.printBreak = function () {
                this.out('\n');
                return this;
            };

            Print.prototype.clearCurrentLine = function () {
                this.out("\r\33[K");
                return this;
            };

            Print.prototype.printSuccessCount = function (current, total) {
                this.out(' \33[36m\33[1mSuccessful      :\33[0m \33[32m\33[1m' + ((current / total) * 100).toFixed(2) + '% (' + current + '/' + total + ')\33[0m\n');
            };

            Print.prototype.printFailedCount = function (current, total) {
                this.out(' \33[36m\33[1mFailure         :\33[0m \33[31m\33[1m' + ((current / total) * 100).toFixed(2) + '% (' + current + '/' + total + ')\33[0m\n');
            };

            Print.prototype.printTypingsWithoutTestsMessage = function () {
                this.out(' \33[36m\33[1mTyping without tests\33[0m\n');
            };

            Print.prototype.printTotalMessage = function () {
                this.out(' \33[36m\33[1mTotal\33[0m\n');
            };

            Print.prototype.printElapsedTime = function (time, s) {
                this.out(' \33[36m\33[1mElapsed time    :\33[0m ~' + time + ' (' + s + 's)\n');
            };

            Print.prototype.printSuiteErrorCount = function (errorHeadline, current, total, valuesColor) {
                if (typeof valuesColor === "undefined") { valuesColor = '\33[31m\33[1m'; }
                this.out(' \33[36m\33[1m').out(errorHeadline).out(this.repeat(' ', 16 - errorHeadline.length));
                this.out(':\33[0m ' + valuesColor + ((current / total) * 100).toFixed(2) + '% (' + current + '/' + total + ')\33[0m\n');
            };

            Print.prototype.printTypingsWithoutTestName = function (file) {
                this.out(' - \33[33m\33[1m' + file + '\33[0m\n');
            };

            Print.prototype.printTypingsWithoutTest = function (withoutTestTypings) {
                var _this = this;
                if (withoutTestTypings.length > 0) {
                    this.printTypingsWithoutTestsMessage();

                    this.printDiv();
                    withoutTestTypings.forEach(function (t) {
                        _this.printTypingsWithoutTestName(t);
                    });
                }
            };
            return Print;
        })();

        var TestSuiteBase = (function () {
            function TestSuiteBase(options, testSuiteName, errorHeadline) {
                this.options = options;
                this.testSuiteName = testSuiteName;
                this.errorHeadline = errorHeadline;
                this.timer = new Timer();
                this.testResults = [];
                this.printErrorCount = true;
            }
            TestSuiteBase.prototype.filterTargetFiles = function (files) {
                throw new Error("please implement this method");
            };

            TestSuiteBase.prototype.start = function (targetFiles, testCallback, suiteCallback) {
                var _this = this;
                targetFiles = this.filterTargetFiles(targetFiles);
                this.timer.start();
                var count = 0;

                var executor = function () {
                    var targetFile = targetFiles[count];
                    if (targetFile) {
                        _this.runTest(targetFile, function (result) {
                            testCallback(result, count + 1);
                            count++;
                            executor();
                        });
                    } else {
                        _this.timer.end();
                        _this.finish(suiteCallback);
                    }
                };
                executor();
            };

            TestSuiteBase.prototype.runTest = function (targetFile, callback) {
                var _this = this;
                new Test(this, targetFile, { tscVersion: this.options.tscVersion }).run(function (result) {
                    _this.testResults.push(result);
                    callback(result);
                });
            };

            TestSuiteBase.prototype.finish = function (suiteCallback) {
                suiteCallback(this);
            };

            Object.defineProperty(TestSuiteBase.prototype, "okTests", {
                get: function () {
                    return this.testResults.filter(function (r) {
                        return r.success;
                    });
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(TestSuiteBase.prototype, "ngTests", {
                get: function () {
                    return this.testResults.filter(function (r) {
                        return !r.success;
                    });
                },
                enumerable: true,
                configurable: true
            });
            return TestSuiteBase;
        })();

        var SyntaxChecking = (function (_super) {
            __extends(SyntaxChecking, _super);
            function SyntaxChecking(options) {
                _super.call(this, options, "Syntax checking", "Syntax error");
            }
            SyntaxChecking.prototype.filterTargetFiles = function (files) {
                return files.filter(function (file) {
                    return endsWith(file.formatName.toUpperCase(), '.D.TS');
                });
            };
            return SyntaxChecking;
        })(TestSuiteBase);

        var TestEval = (function (_super) {
            __extends(TestEval, _super);
            function TestEval(options) {
                _super.call(this, options, "Typing tests", "Failed tests");
            }
            TestEval.prototype.filterTargetFiles = function (files) {
                return files.filter(function (file) {
                    return endsWith(file.formatName.toUpperCase(), '-TESTS.TS');
                });
            };
            return TestEval;
        })(TestSuiteBase);

        var FindNotRequiredTscparams = (function (_super) {
            __extends(FindNotRequiredTscparams, _super);
            function FindNotRequiredTscparams(options, print) {
                var _this = this;
                _super.call(this, options, "Find not required .tscparams files", "New arrival!");
                this.print = print;
                this.printErrorCount = false;

                this.testReporter = {
                    printPositiveCharacter: function (index, testResult) {
                        _this.print.clearCurrentLine().printTypingsWithoutTestName(testResult.targetFile.formatName);
                    },
                    printNegativeCharacter: function (index, testResult) {
                    }
                };
            }
            FindNotRequiredTscparams.prototype.filterTargetFiles = function (files) {
                return files.filter(function (file) {
                    return IO.fileExists(file.filePathWithName + '.tscparams');
                });
            };

            FindNotRequiredTscparams.prototype.runTest = function (targetFile, callback) {
                var _this = this;
                this.print.clearCurrentLine().out(targetFile.formatName);
                new Test(this, targetFile, { tscVersion: this.options.tscVersion, useTscParams: false, checkNoImplicitAny: true }).run(function (result) {
                    _this.testResults.push(result);
                    callback(result);
                });
            };

            FindNotRequiredTscparams.prototype.finish = function (suiteCallback) {
                this.print.clearCurrentLine();
                suiteCallback(this);
            };

            Object.defineProperty(FindNotRequiredTscparams.prototype, "ngTests", {
                get: function () {
                    return [];
                },
                enumerable: true,
                configurable: true
            });
            return FindNotRequiredTscparams;
        })(TestSuiteBase);

        var TestRunner = (function () {
            function TestRunner(dtPath, options) {
                if (typeof options === "undefined") { options = { tscVersion: TestManager.DEFAULT_TSC_VERSION }; }
                this.options = options;
                this.suites = [];
                this.options.findNotRequiredTscparams = !!this.options.findNotRequiredTscparams;

                var filesName = IO.dir(dtPath, /.\.ts/g, { recursive: true }).sort();

                filesName = filesName.filter(function (fileName) {
                    return fileName.indexOf('../_infrastructure') < 0;
                }).filter(function (fileName) {
                    return !endsWith(fileName, ".tscparams");
                });
                this.files = filesName.map(function (fileName) {
                    return new File(dtPath, fileName);
                });
            }
            TestRunner.prototype.addSuite = function (suite) {
                this.suites.push(suite);
            };

            TestRunner.prototype.run = function () {
                var _this = this;
                this.timer = new Timer();
                this.timer.start();

                var syntaxChecking = new SyntaxChecking(this.options);
                var testEval = new TestEval(this.options);
                if (!this.options.findNotRequiredTscparams) {
                    this.addSuite(syntaxChecking);
                    this.addSuite(testEval);
                }

                var typings = syntaxChecking.filterTargetFiles(this.files).length;
                var testFiles = testEval.filterTargetFiles(this.files).length;
                this.print = new Print(this.options.tscVersion, typings, testFiles, this.files.length);
                this.print.printHeader();

                if (this.options.findNotRequiredTscparams) {
                    this.addSuite(new FindNotRequiredTscparams(this.options, this.print));
                }

                var count = 0;
                var executor = function () {
                    var suite = _this.suites[count];
                    if (suite) {
                        suite.testReporter = suite.testReporter || new DefaultTestReporter(_this.print);

                        _this.print.printSuiteHeader(suite.testSuiteName);
                        var targetFiles = suite.filterTargetFiles(_this.files);
                        suite.start(targetFiles, function (testResult, index) {
                            _this.testCompleteCallback(testResult, index);
                        }, function (suite) {
                            _this.suiteCompleteCallback(suite);
                            count++;
                            executor();
                        });
                    } else {
                        _this.timer.end();
                        _this.allTestCompleteCallback();
                    }
                };
                executor();
            };

            TestRunner.prototype.testCompleteCallback = function (testResult, index) {
                var reporter = testResult.hostedBy.testReporter;
                if (testResult.success) {
                    reporter.printPositiveCharacter(index, testResult);
                } else {
                    reporter.printNegativeCharacter(index, testResult);
                }
            };

            TestRunner.prototype.suiteCompleteCallback = function (suite) {
                this.print.printBreak();

                this.print.printDiv();
                this.print.printElapsedTime(suite.timer.asString, suite.timer.time);
                this.print.printSuccessCount(suite.okTests.length, suite.testResults.length);
                this.print.printFailedCount(suite.ngTests.length, suite.testResults.length);
            };

            TestRunner.prototype.allTestCompleteCallback = function () {
                var _this = this;
                var testEval = this.suites.filter(function (suite) {
                    return suite instanceof TestEval;
                })[0];
                if (testEval) {
                    var existsTestTypings = testEval.testResults.map(function (testResult) {
                        return testResult.targetFile.dir;
                    }).reduce(function (a, b) {
                        return a.indexOf(b) < 0 ? a.concat([b]) : a;
                    }, []);
                    var typings = this.files.map(function (file) {
                        return file.dir;
                    }).reduce(function (a, b) {
                        return a.indexOf(b) < 0 ? a.concat([b]) : a;
                    }, []);
                    var withoutTestTypings = typings.filter(function (typing) {
                        return existsTestTypings.indexOf(typing) < 0;
                    });
                    this.print.printDiv();
                    this.print.printTypingsWithoutTest(withoutTestTypings);
                }

                this.print.printDiv();
                this.print.printTotalMessage();

                this.print.printDiv();
                this.print.printElapsedTime(this.timer.asString, this.timer.time);
                this.suites.filter(function (suite) {
                    return suite.printErrorCount;
                }).forEach(function (suite) {
                    _this.print.printSuiteErrorCount(suite.errorHeadline, suite.ngTests.length, suite.testResults.length);
                });
                if (testEval) {
                    this.print.printSuiteErrorCount("Without tests", withoutTestTypings.length, typings.length, '\33[33m\33[1m');
                }

                this.print.printDiv();
                if (this.suites.some(function (suite) {
                    return suite.ngTests.length !== 0;
                })) {
                    this.print.printErrorsHeader();

                    this.suites.filter(function (suite) {
                        return suite.ngTests.length !== 0;
                    }).forEach(function (suite) {
                        suite.ngTests.forEach(function (testResult) {
                            _this.print.printErrorsForFile(testResult);
                        });
                        _this.print.printBoldDiv();
                    });

                    process.exit(1);
                }
            };
            return TestRunner;
        })();
        TestManager.TestRunner = TestRunner;
    })(DefinitelyTyped.TestManager || (DefinitelyTyped.TestManager = {}));
    var TestManager = DefinitelyTyped.TestManager;
})(DefinitelyTyped || (DefinitelyTyped = {}));

var dtPath = __dirname + '/../..';
var findNotRequiredTscparams = process.argv.some(function (arg) {
    return arg == "--try-without-tscparams";
});
var tscVersionIndex = process.argv.indexOf("--tsc-version");
var tscVersion = DefinitelyTyped.TestManager.DEFAULT_TSC_VERSION;
if (-1 < tscVersionIndex) {
    tscVersion = process.argv[tscVersionIndex + 1];
}

var runner = new DefinitelyTyped.TestManager.TestRunner(dtPath, {
    tscVersion: tscVersion,
    findNotRequiredTscparams: findNotRequiredTscparams
});
runner.run();
//# sourceMappingURL=runner.js.map
