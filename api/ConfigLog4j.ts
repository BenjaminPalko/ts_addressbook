
import {LoggerFactory, LoggerFactoryOptions, LFService, LogGroupRule, LogLevel } from "typescript-logging";
export {Logger} from "typescript-logging"

const options: LoggerFactoryOptions = new LoggerFactoryOptions().addLogGroupRule(new LogGroupRule(new RegExp(".+"), LogLevel.Info));
export const factory: LoggerFactory = LFService.createNamedLoggerFactory("LoggerFactory", options);
