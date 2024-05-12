DROP DATABASE IF EXISTS goodgarden;
CREATE DATABASE goodgarden;

USE goodgarden;

-- PLANTEN

CREATE TABLE `planten` (
  `planten_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `plant_naam` varchar(50)  NOT NULL,
  `plantensoort` varchar(50) NOT NULL,
  `plant_geteelt` tinyint(1) NOT NULL,
  `kas_locatie` ENUM('LEFT', 'RIGHT') NOT NULL,
  PRIMARY KEY (`planten_id`)
);

INSERT INTO `planten` (`planten_id`, `plant_naam`, `plantensoort`, `plant_geteelt`, `kas_locatie`) VALUES
(1, 'Tomatenplant', 'Groente', 1, "LEFT"),
(2, "Koriander", "Kruiden", 1, "LEFT"),
(3, "Aardbei", "Fruit", 1, "RIGHT");

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

CREATE TABLE `oogsten`
(
  `oogst_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `plant_id` int(10) UNSIGNED DEFAULT NULL,
  `datum` date,
  `succesvol` boolean DEFAULT true,
  PRIMARY KEY (`oogst_id`),
  FOREIGN KEY (`plant_id`) REFERENCES `planten`(`planten_id`)
);

INSERT INTO `oogsten` (`plant_id`, `datum`, `succesvol`) 
VALUES
  (1, "2023-06-20", true),
  (1, "2023-06-20", true),
  (2, "2023-06-21", false),
  (2, "2023-06-22", true),
  (3, "2023-06-23", true),
  (3, "2023-06-25", true),
  (3, "2023-06-27", false),
  (3, "2023-06-29", true);
