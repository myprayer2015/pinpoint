CREATE TABLE `pinpoint`.`service_traces` (
  `id` INT NOT NULL COMMENT '',
  `path` VARCHAR(1024) NULL COMMENT '',
  `method` VARCHAR(45) NULL COMMENT '',
  `tracesNum` INT(2) NULL COMMENT '',
  `service` VARCHAR(45) NULL COMMENT '',
  `description` VARCHAR(1024) NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '');

INSERT INTO `pinpoint`.`service_traces` (`id`,`path`,`method`,`tracesNum`,`service`,`description`)
VALUES
(0,'/accounts/{account}','GET','10','Account service','Get specified account data');

INSERT INTO `pinpoint`.`service_traces` (`id`,`path`,`method`,`tracesNum`,`service`,`description`)
VALUES
(1,'/accounts/current','GET','8','Account service','Get current account data');

INSERT INTO `pinpoint`.`service_traces` (`id`,`path`,`method`,`tracesNum`,`service`,`description`)
VALUES
(2,'/accounts/demo','GET','8','Account service','Get demo account data (pre-filled incomes/expenses items, etc)');

INSERT INTO `pinpoint`.`service_traces` (`id`,`path`,`method`,`tracesNum`,`service`,`description`)
VALUES
(3,'/accounts/current','GET','8','Account service','Save current account data');

INSERT INTO `pinpoint`.`service_traces` (`id`,`path`,`method`,`tracesNum`,`service`,`description`)
VALUES
(4,'/accounts/','POST','8','Account service','Register new account');


INSERT INTO `pinpoint`.`service_traces` (`id`,`path`,`method`,`tracesNum`,`service`,`description`)
VALUES
(5,'/statistics/{account}','GET','8','Statistics service','	Get specified account statistics');

INSERT INTO `pinpoint`.`service_traces` (`id`,`path`,`method`,`tracesNum`,`service`,`description`)
VALUES
(6,'/statistics/current','GET','8','Statistics service','Get current account statistics');

INSERT INTO `pinpoint`.`service_traces` (`id`,`path`,`method`,`tracesNum`,`service`,`description`)
VALUES
(7,'/statistics/demo','GET','8','Statistics service','Get demo account statistics');

INSERT INTO `pinpoint`.`service_traces` (`id`,`path`,`method`,`tracesNum`,`service`,`description`)
VALUES
(8,'/statistics/{account}','PUT','8','Statistics service','Create or update time series datapoint for specified account');

INSERT INTO `pinpoint`.`service_traces` (`id`,`path`,`method`,`tracesNum`,`service`,`description`)
VALUES
(9,'/notifications/settings/current','GET','8','Notification service','Get current account notification settings');

INSERT INTO `pinpoint`.`service_traces` (`id`,`path`,`method`,`tracesNum`,`service`,`description`)
VALUES
(10,'/notifications/settings/current','PUT','8','Notification service','Save current account notification settings');


