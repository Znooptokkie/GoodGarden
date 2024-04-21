DROP DATABASE IF EXISTS goodgarden;
CREATE DATABASE goodgarden;

USE goodgarden;

-- BETTERY VOLTAGE EVENTS

CREATE TABLE `battery_voltage_events` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `timestamp` int(11) DEFAULT NULL,
  `gateway_receive_time` varchar(50) DEFAULT NULL,
  `device` int(11) DEFAULT NULL,
  `value` decimal(10,5) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `battery_voltage_events` (`timestamp`, `gateway_receive_time`, `device`, `value`) VALUES
(1710839863, '2024-03-19T09:17:43Z', 256, 4.03663),
(1710842346, '2024-03-19T09:59:06Z', 322, 4.08547);

ALTER TABLE `battery_voltage_events`
  ADD UNIQUE KEY `timestamp` (`timestamp`),
  ADD UNIQUE KEY `gateway_receive_time` (`gateway_receive_time`);

-- CARE SCHEDULES

CREATE TABLE `care_schedules` (
  `plant_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `water` int(11) DEFAULT NULL,
  `bemesting` int(11) DEFAULT NULL,
  PRIMARY KEY (`plant_id`)
);

INSERT INTO `care_schedules` (`plant_id`, `water`, `bemesting`) VALUES
(1, 2, 15),
(2, 3, 10),
(3, 2, 10),
(4, 2, 15),
(5, 2, 15),
(6, 3, 15),
(7, 3, 10),
(8, 2, 15),
(9, 2, 10),
(10, 2, 10),
(11, 2, 15),
(12, 3, 15),
(13, 2, 10),
(14, 3, 15),
(15, 2, 10);

-- DEVICES

CREATE TABLE `devices` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `serial_number` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `last_seen` int(11) DEFAULT NULL,
  `last_battery_voltage` float DEFAULT NULL,
  `device_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `last_seen` (`last_seen`)
  -- UNIQUE KEY `last_battery_voltage` (`last_battery_voltage`)
);

INSERT INTO `devices` (`serial_number`, `name`, `label`, `last_seen`, `last_battery_voltage`, `device_id`) VALUES
('0033889B1BAB1169', 'firefly2_0051', 'The Field', 1712297000, 3.92796, 256),
('006FE1FC316ED7D8', 'firefly2_0111', 'The Field', 1712297257, 4.07448, 322);

-- FETCH

CREATE TABLE `fetch` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `timestamp` int(11) DEFAULT NULL,
  `gateway_receive_time` varchar(50) DEFAULT NULL,
  `device` int(11) DEFAULT NULL,
  `value` decimal(10,5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `timestamp` (`timestamp`),
  UNIQUE KEY `gateway_receive_time` (`gateway_receive_time`)
  -- UNIQUE KEY `value` (`value`)
);

-- PAR_EVENTS

CREATE TABLE `par_events` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `timestamp` int(11) DEFAULT NULL,
  `gateway_receive_time` varchar(50) DEFAULT NULL,
  `device` int(11) DEFAULT NULL,
  `value` decimal(10,5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `timestamp` (`timestamp`),
  UNIQUE KEY `gateway_receive_time` (`gateway_receive_time`)
  -- UNIQUE KEY `value` (`value`)
);

-- PLANTEN

CREATE TABLE `planten` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `plant_naam` varchar(50) DEFAULT NULL,
  `plantensoort` varchar(50) NOT NULL,
  `plant_geteelt` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `planten` (`id`, `plant_naam`, `plantensoort`, `plant_geteelt`) VALUES
(1, 'Tomatenplant', 'Groente', 1);

-- PLANTS

CREATE TABLE `plants` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `beschrijving` text DEFAULT NULL,
  `licht` varchar(50) DEFAULT NULL,
  `vochtigheid` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `plants` (`id`, `name`, `type`, `beschrijving`, `licht`, `vochtigheid`) VALUES
(1, 'Tomaat', 'Groente', 'Tomaat (Solanum lycopersicum) is een veelgeteelde groenteplant in de nachtschadefamilie.', 'Volle Zon', '70'),
(2, 'Sla', 'Groente', 'Sla (Lactuca sativa) is een bladgroente die vaak wordt gebruikt in salades.', 'Gedeeltelijke Schaduw', '80'),
(3, 'Wortel', 'Groente', 'Wortel (Daucus carota) is een wortelgroente meestal oranje van kleur.', 'Volle Zon', '60'),
(4, 'Komkommer', 'Groente', 'Komkommer (Cucumis sativus) is een veel gekweekte kruipende wijnplant in de familie Cucurbitaceae.', 'Volle Zon', '65'),
(5, 'Aardappel', 'Groente', 'Aardappel (Solanum tuberosum) is een zetmeelhoudend knolgewas van de vaste plant Solanum tuberosum.', 'Gedeeltelijke Schaduw', '75'),
(6, 'Courgette', 'Groente', 'Courgette (Cucurbita pepo) is een zomerpompoen die bijna een meter lang kan worden, maar meestal onrijp wordt geoogst op 15 tot 25 cm.', 'Volle Zon', '70'),
(7, 'Spinazie', 'Groente', 'Spinazie (Spinacia oleracea) is een bladgroente afkomstig uit Centraal- en West-Azië.', 'Gedeeltelijke Schaduw', '70'),
(8, 'Paprika', 'Groente', 'Paprika (Capsicum annuum) is een fruit- en groenteplant gekweekt om zijn vruchten.', 'Volle Zon', '80'),
(9, 'Ui', 'Groente', 'Ui (Allium cepa) is een groente die de meest geteelde soort is van het geslacht Allium.', 'Volle Zon', '50'),
(10, 'Radijs', 'Groente', 'Radijs (Raphanus raphanistrum subsp. sativus) is een eetbare wortelgroente.', 'Volle Zon', '70'),
(11, 'Groene Boon', 'Groente', 'Groene bonen zijn de onrijpe, jonge vruchten en beschermende peulen van verschillende cultivars van de gewone boon.', 'Volle Zon', '75'),
(12, 'Broccoli', 'Groente', 'Broccoli (Brassica oleracea var. italica) is een koelgewas dat in het voorjaar of de herfst kan worden gekweekt.', 'Volle Zon', '75'),
(13, 'Kool', 'Groente', 'Kool (Brassica oleracea of varianten) is een bladgroente, rood of wit, een tweejarige plant die wordt geteeld als eenjarige groente.', 'Gedeeltelijke Schaduw', '80'),
(14, 'Aubergine', 'Groente', 'Aubergine (Solanum melongena) is een soort in de nachtschadefamilie die wordt gekweekt om zijn eetbare vruchten.', 'Volle Zon', '85'),
(15, 'Boerenkool', 'Groente', 'Boerenkool of bladkool (Brassica oleracea var. acephala) is een groenteplant met groene of paarse bladeren.', 'Gedeeltelijke Schaduw', '70');

-- RELATIVE HUMIDITY EVENTS

CREATE TABLE `relative_humidity_events` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `timestamp` int(11) DEFAULT NULL,
  `gateway_receive_time` varchar(50) DEFAULT NULL,
  `device` int(11) DEFAULT NULL,
  `value` decimal(10,5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `timestamp` (`timestamp`),
  UNIQUE KEY `gateway_receive_time` (`gateway_receive_time`)
  -- UNIQUE KEY `value` (`value`)
);

-- SOIL ELECTRIC CONDUCTIVITY EVENTS

CREATE TABLE `soil_electric_conductivity_events` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `timestamp` int(11) DEFAULT NULL,
  `gateway_receive_time` varchar(50) DEFAULT NULL,
  `device` int(11) DEFAULT NULL,
  `value` decimal(10,5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `timestamp` (`timestamp`),
  UNIQUE KEY `gateway_receive_time` (`gateway_receive_time`)
  -- UNIQUE KEY `value` (`value`)
);

-- SOIL RELATIVE PERMITTIVITY EVENTS

CREATE TABLE `soil_relative_permittivity_events` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `timestamp` int(11) DEFAULT NULL,
  `gateway_receive_time` varchar(50) DEFAULT NULL,
  `device` int(11) DEFAULT NULL,
  `value` decimal(10,5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `timestamp` (`timestamp`),
  UNIQUE KEY `gateway_receive_time` (`gateway_receive_time`)
  -- UNIQUE KEY `value` (`value`)
);

-- SOIL TEMPERATURE EVENTS

CREATE TABLE `soil_temperature_events` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `timestamp` int(11) DEFAULT NULL,
  `gateway_receive_time` varchar(50) DEFAULT NULL,
  `device` int(11) DEFAULT NULL,
  `value` decimal(10,5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `timestamp` (`timestamp`),
  UNIQUE KEY `gateway_receive_time` (`gateway_receive_time`)
  -- UNIQUE KEY `value` (`value`)
);
