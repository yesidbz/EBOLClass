-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-05-2019 a las 06:59:14
-- Versión del servidor: 10.1.25-MariaDB
-- Versión de PHP: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ebolc`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `acudiente`
--

CREATE TABLE `acudiente` (
  `id` bigint(11) NOT NULL,
  `documento` bigint(11) NOT NULL,
  `id_tipodocumento` int(40) NOT NULL,
  `eps` varchar(40) NOT NULL,
  `rh` varchar(40) NOT NULL,
  `Lugar_espedicion` varchar(40) NOT NULL,
  `fecha_expedicion` date NOT NULL,
  `Primer_nombre` varchar(40) NOT NULL,
  `segundo_nombre` varchar(40) DEFAULT NULL,
  `primer_apellido` varchar(40) NOT NULL,
  `segundo_apellido` varchar(40) NOT NULL,
  `celular` varchar(40) NOT NULL,
  `telefono` int(11) NOT NULL,
  `id_municipio` int(11) NOT NULL,
  `direccion` varchar(40) NOT NULL,
  `estado` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `acudiente`
--

INSERT INTO `acudiente` (`id`, `documento`, `id_tipodocumento`, `eps`, `rh`, `Lugar_espedicion`, `fecha_expedicion`, `Primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `celular`, `telefono`, `id_municipio`, `direccion`, `estado`) VALUES
(1, 1000000, 3, 'savia', 'o+', 'medellin', '2019-02-13', 'marcos', 'pedro', 'ruiz', 'quiroz', '3113516578', 3113456, 4, 'carrera 90', 1),
(8, 99999999999, 3, 'savia', '0+', 'medellin', '2019-02-13', 'marcos', 'sarabita', 'ruiz', 'londoño', '3113516598', 2223565, 4, 'Cr 68 B Norte # 92 BB Norte - 45 301', 1),
(9, 99999999998, 3, 'adsfsa', '0+', 'medellin', '2019-05-13', 'marcos', 'sarabita', 'ruiz', 'londoño', '3113516598', 2223565, 8, 'Cr 68 B Norte # 92 BB Norte - 45 301', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `iddocente` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `segundo_nombre` varchar(40) NOT NULL,
  `primer_apellido` varchar(40) NOT NULL,
  `segundo_apellido` varchar(40) DEFAULT NULL,
  `celular` varchar(20) NOT NULL,
  `telefono` bigint(11) NOT NULL,
  `documento_docente` bigint(11) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1',
  `foto` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`iddocente`, `name`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `celular`, `telefono`, `documento_docente`, `direccion`, `estado`, `foto`) VALUES
(4, 'esteban', 'sarabita', 'ruiz', 'margarita', '3113516598', 2223565, 1000345456, 'Cr 68 B Norte # 92 BB Norte - 45 301', 1, 'C:\\fakepath\\campamento-verano--620x349.jpg'),
(5, 'esteban', 'rejina', 'ruiz', 'ocampo', '3113516598', 2223565, 1000394354, 'Cr 68 B Norte # 92 BB Norte - 45 301', 0, 'C:\\fakepath\\campamento-verano--620x349.jpg'),
(6, 'esteban', 'rejina', 'ruiz', 'londoño', '99999999999', 2223565, 99999999999, 'Cr 68 B Norte # 92 BB Norte - 45 301', 1, 'C:\\fakepath\\campamento-verano--620x349.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anolectivo`
--

CREATE TABLE `anolectivo` (
  `idano` int(11) NOT NULL,
  `anoelectivo` int(11) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `anolectivo`
--

INSERT INTO `anolectivo` (`idano`, `anoelectivo`, `estado`) VALUES
(6, 2013, 0),
(5, 2028, 1),
(7, 2020, 1),
(8, 2019, 1),
(9, 2000, 1),
(10, 2021, 1),
(11, 2021, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area`
--

CREATE TABLE `area` (
  `id_area` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `area`
--

INSERT INTO `area` (`id_area`, `nombre`, `estado`) VALUES
(1, 'física cuántica', 0),
(2, 'mecanografia', 1),
(3, 'quimica', 1),
(4, 'españool', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignatura`
--

CREATE TABLE `asignatura` (
  `idasignatura` int(11) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1',
  `nombre` varchar(30) NOT NULL,
  `id_area` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `asignatura`
--

INSERT INTO `asignatura` (`idasignatura`, `estado`, `nombre`, `id_area`) VALUES
(1, 1, 'matematicas', 0),
(2, 1, 'español', 0),
(3, 1, 'fisica', 1),
(4, 1, 'quimica', 1),
(5, 1, 'sociales', 1),
(6, 1, 'fisica', 1),
(7, 1, 'lector', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento`
--

CREATE TABLE `departamento` (
  `id_departamento` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `departamento`
--

INSERT INTO `departamento` (`id_departamento`, `nombre`, `estado`) VALUES
(1, 'Antioquias', 0),
(2, 'valle del cauca', 1),
(3, 'amazonas', 0),
(4, 'guajiras', 1),
(5, 'antioquiaa', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dias`
--

CREATE TABLE `dias` (
  `Id_dia` int(11) NOT NULL,
  `Nombre` varchar(10) NOT NULL,
  `Descripcion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `dias`
--

INSERT INTO `dias` (`Id_dia`, `Nombre`, `Descripcion`) VALUES
(1, 'Lunes', ''),
(2, 'Martes', ''),
(3, 'Miércoles', ''),
(4, 'Jueves', ''),
(5, 'Viernes', ''),
(6, 'Sábado', ''),
(7, 'Domingo', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dimension`
--

CREATE TABLE `dimension` (
  `iddimension` int(11) NOT NULL,
  `porcentaje` varchar(11) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Volcado de datos para la tabla `dimension`
--

INSERT INTO `dimension` (`iddimension`, `porcentaje`, `estado`) VALUES
(1, 'saber', 0),
(3, 'hacer', 0),
(4, 'ser', 1),
(5, 'saabeer', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docente`
--

CREATE TABLE `docente` (
  `iddocente` int(11) NOT NULL,
  `primer_nombre` varchar(20) NOT NULL,
  `segundo_nombre` varchar(20) DEFAULT NULL,
  `primer_apellido` varchar(20) NOT NULL,
  `segundo_apellido` varchar(20) NOT NULL,
  `celular` varchar(20) NOT NULL,
  `telefono` int(10) NOT NULL,
  `documento_docente` bigint(20) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `docente`
--

INSERT INTO `docente` (`iddocente`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `celular`, `telefono`, `documento_docente`, `direccion`, `estado`) VALUES
(1, 'jonathan', 'erney', 'puerta', 'flores', '3105971790', 2145668, 1000759896, 'CR 25 # 46-36', 1),
(2, 'juan', 'pablo', 'toro', 'garcia', '3128676868', 2145250, 1000756030, 'CR 25 # 64-36', 1),
(3, 'juan', 'fernando', 'torres', 'hurtado', '3128965478', 21456987, 1000258963, 'calle 25 # 12-39', 0),
(4, 'marta', 'pedro', 'bedoya', 'quiroz', '12345432', 1234567, 12133, '121123', 1),
(5, 'jonathan', NULL, 'ruiz', 'quiroz', '3105973456', 2145669, 1000354789, 'CR 25 # 46-36', 1),
(6, 'yesid', NULL, 'gomez', 'arrieta', '3113617687', 3333333, 1000365789, 'carrera 90', 1),
(7, 'yesid', NULL, 'rua', 'areas', '3113516795', 31131375, 1100456789, 'carrera 80', 1),
(8, 'carlos', 'andres', 'Maya', 'quiroz', '3128965478', 2145250, 1000756032, 'calle 25 # 12-39', 0),
(9, 'marcos', 'rejina', 'ruiz', 'ocampo', '3113516598', 2223543, 1000234567, 'Cr 68 B Norte # 92 BB Norte - 45 301', 1),
(10, 'marcos', 'rejina', 'ruiz', 'ocampo', '3113516597', 2223564, 1000394354, 'Cr 68 B Norte # 92 BB Norte - 45 301', 1),
(11, 'marcos', 'rejina', 'sadfdsf', 'londoño', '3113516598', 3113552, 1000345456, 'Cr 68 B Norte # 92 BB Norte - 45 301', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docente_asignatura`
--

CREATE TABLE `docente_asignatura` (
  `id_docente_asignatura` int(11) NOT NULL,
  `iddocente` int(11) DEFAULT NULL,
  `idasignatura` int(11) DEFAULT NULL,
  `estado` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `docente_asignatura`
--

INSERT INTO `docente_asignatura` (`id_docente_asignatura`, `iddocente`, `idasignatura`, `estado`) VALUES
(2, 6, 3, 1),
(3, 2, 6, 1),
(4, 6, 4, 1),
(5, 6, 5, 1),
(6, 6, 7, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docente_asignatura_planeacion`
--

CREATE TABLE `docente_asignatura_planeacion` (
  `id_docente_asignatura_planeacion` int(11) NOT NULL,
  `id_docente_asignatura` int(11) NOT NULL,
  `id_planeacion_dimension` int(11) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1',
  `porcentaje` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `docente_asignatura_planeacion`
--

INSERT INTO `docente_asignatura_planeacion` (`id_docente_asignatura_planeacion`, `id_docente_asignatura`, `id_planeacion_dimension`, `estado`, `porcentaje`) VALUES
(3, 2, 3, 1, 11),
(4, 2, 2, 1, 56),
(5, 2, 1, 1, 30),
(6, 2, 1, 1, 30),
(7, 3, 1, 1, 20),
(8, 3, 1, 1, 20),
(9, 3, 1, 1, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante`
--

CREATE TABLE `estudiante` (
  `id` int(11) NOT NULL,
  `documento` bigint(11) NOT NULL,
  `id_tipodocumento` int(40) NOT NULL,
  `eps` varchar(40) NOT NULL,
  `rh` varchar(40) NOT NULL,
  `Lugar_espedicion` varchar(40) NOT NULL,
  `fecha_expedicion` date NOT NULL,
  `Primer_nombre` varchar(40) NOT NULL,
  `segundo_nombre` varchar(40) DEFAULT NULL,
  `primer_apellido` varchar(40) NOT NULL,
  `segundo_apellido` varchar(40) NOT NULL,
  `celular` varchar(40) NOT NULL,
  `telefono` int(11) NOT NULL,
  `id_municipio` int(11) NOT NULL,
  `direccion` varchar(40) NOT NULL,
  `estado` int(1) NOT NULL DEFAULT '1',
  `id_acudiente` int(11) NOT NULL,
  `id_parentesco` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `estudiante`
--

INSERT INTO `estudiante` (`id`, `documento`, `id_tipodocumento`, `eps`, `rh`, `Lugar_espedicion`, `fecha_expedicion`, `Primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `celular`, `telefono`, `id_municipio`, `direccion`, `estado`, `id_acudiente`, `id_parentesco`) VALUES
(6, 1000354678, 1, 'sura', 'o-', 'medellin', '2019-02-06', 'yuritza', 'gabriela', 'puerta', 'mosquera', '3113516578', 1234567, 3, 'CR 25 # 46-36', 1, 1, 0),
(7, 1344859066, 3, 'sura', 'o+', 'bogota', '2019-01-21', 'marcos', NULL, 'puerta', 'mosquera', '3113516578', 1234567, 1, 'carrera 90', 1, 3, 0),
(8, 1017270383, 1, 'sura', 'o+', 'medellin', '2019-04-01', 'Camilo', 'Andres', 'Rivas', 'Orobio', '3131231232', 3212112, 3, 'calle 25 # 12-39', 1, 2, 0),
(9, 1000756030, 1, 'sura', 'o+', 'medellin', '2000-12-30', 'juan', 'sebastian', 'toro', 'vanegas', '3128676868', 2145250, 1, 'cr 1b # 46 - 30', 0, 3, 0),
(10, 123456789, 1, 'sura', 'o-', 'medellin', '1996-08-02', 'carlos', 'albeiro', 'garcia', 'lopez', '3126547894', 2456897, 4, 'carrera 90', 0, 2, 1),
(11, 99999999999, 3, 'savia', '0+', 'medellin', '2019-03-07', 'marcos', 'sarabito', 'ruiz', 'ocampo', '3113516598', 2223565, 4, 'Cr 68 B Norte # 92 BB Norte - 45 301', 1, 3, 1),
(12, 10003546789, 3, 'savia', '0+', 'medellin', '2019-01-08', 'marcos', 'sarabito', 'ruiz', 'cadavid', '3113516598', 2223565, 4, 'Cr 68 B Norte # 92 BB Norte - 45 301', 1, 3, 1),
(13, 1000394377, 3, 'savia', '0+', 'medellin', '2019-05-05', 'marcos', 'rejina', 'ruiz', 'londoño', '3113516598', 3113552, 4, 'Cr 68 B Norte # 92 BB Norte - 45 301', 0, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grado`
--

CREATE TABLE `grado` (
  `id_grado` int(11) NOT NULL,
  `descripcion` varchar(40) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `grado`
--

INSERT INTO `grado` (`id_grado`, `descripcion`, `estado`) VALUES
(1, '9', 1),
(2, '7', 1),
(3, '8', 0),
(4, '1', 0),
(5, '11', 0),
(6, '6', 0),
(7, '2', 1),
(8, '12', 1),
(9, '12', 1),
(10, '10', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grado_grupo`
--

CREATE TABLE `grado_grupo` (
  `id_grado_grupo` int(11) NOT NULL,
  `id_grupo` int(40) NOT NULL,
  `id_grado` int(40) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `grado_grupo`
--

INSERT INTO `grado_grupo` (`id_grado_grupo`, `id_grupo`, `id_grado`, `estado`) VALUES
(1, 2, 3, 1),
(16, 12, 7, 1),
(17, 12, 10, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grado_grupo_alumno`
--

CREATE TABLE `grado_grupo_alumno` (
  `id_grado_grupo_alumno` int(11) NOT NULL,
  `idano` int(11) DEFAULT NULL,
  `id_grado_grupo` int(11) DEFAULT NULL,
  `iddocente` int(20) NOT NULL,
  `idestudiante` int(20) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `grado_grupo_alumno`
--

INSERT INTO `grado_grupo_alumno` (`id_grado_grupo_alumno`, `idano`, `id_grado_grupo`, `iddocente`, `idestudiante`, `estado`) VALUES
(1000, 1, 1, 1, 1, 1),
(1001, 5, 1, 2, 7, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo`
--

CREATE TABLE `grupo` (
  `id_grupo` int(11) NOT NULL,
  `descripcion` varchar(40) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `grupo`
--

INSERT INTO `grupo` (`id_grupo`, `descripcion`, `estado`) VALUES
(1, '5', 1),
(3, '3', 0),
(4, '4', 0),
(12, '2', 1),
(10, '13', 1),
(11, '12', 0),
(14, '1', 1),
(15, '8', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hora`
--

CREATE TABLE `hora` (
  `id_hora` int(11) NOT NULL,
  `Hora` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `hora`
--

INSERT INTO `hora` (`id_hora`, `Hora`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jornada`
--

CREATE TABLE `jornada` (
  `id_jornada` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `jornada`
--

INSERT INTO `jornada` (`id_jornada`, `nombre`, `hora_inicio`, `hora_fin`, `estado`) VALUES
(1, 'mañana', '06:00:00', '01:00:00', 1),
(2, 'tarde', '12:00:00', '12:00:00', 1),
(3, 'sabado', '12:04:00', '15:00:00', 1),
(4, 'noche', '19:00:00', '23:00:00', 1),
(5, 'mañanas', '06:00:00', '12:00:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_01_13_190400_create_user_verifications_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipio`
--

CREATE TABLE `municipio` (
  `id_municipio` int(11) NOT NULL,
  `Nombre` varchar(11) NOT NULL,
  `id_departamento` int(11) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `municipio`
--

INSERT INTO `municipio` (`id_municipio`, `Nombre`, `id_departamento`, `estado`) VALUES
(1, 'medellin', 1, 0),
(3, 'barbosa', 1, 0),
(4, 'Caldas', 1, 1),
(5, 'copacabana', 1, 0),
(6, 'cali', 2, 0),
(7, 'boyaca', 4, 1),
(8, 'cauca', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parentesco`
--

CREATE TABLE `parentesco` (
  `id_parentesco` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `parentesco`
--

INSERT INTO `parentesco` (`id_parentesco`, `nombre`, `estado`) VALUES
(1, 'Padre', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp(6) NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `password_resets`
--

INSERT INTO `password_resets` (`email`, `token`, `created_at`) VALUES
('estebanjimenezruiz10.3@gmail.com', '$2y$10$p7hbmQvnq918L2ebUjMuhO/pzwmiQoLGaHY1QYaX4Ff43PnsgqjqS', '2019-05-14 05:11:55.000000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planeacion`
--

CREATE TABLE `planeacion` (
  `idplaneacion` int(11) NOT NULL,
  `descri` varchar(2000) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `planeacion`
--

INSERT INTO `planeacion` (`idplaneacion`, `descri`, `estado`) VALUES
(1, 'SQLSTATE[42S22]: Column not found: 1054 Unknown column \'iddimension\' in \'field list\' (SQL: insert into `planeacion` (`iddimension`, `descri`, `porcentajep`) values (1, Su modo de expresión más frecuente es el verso corto, en el que abundan ritmos o recurrencias fónicas, semánticas o de estructura sintáctica. Así, por ejemplos, el ritmo se conseguía en la poesía hebrea repitiendo el mismo significado de un verso en el siguiente, pero de forma distinta. En la poesía germánica antigua, el ritmo se conseguía en cada verso repitiendo el mismo sonido al principio de tres palabras y en la poesía occidental, se consideraba que había verso si existía una repetición (rima) al final de cada verso y cierto ritmo fijo en la acentuación de determinadas sílabas., 30))', 0),
(2, 'La planeación es la acción de la elaboración de estrategias que permiten alcanzar una meta ya establecida, para que esto se puede llevar a cabo se requieren de varios elementos, primero se debe comprender y analizar una cosa o situación en específica, para luego pasar a la definir los objetivos que se quieren alcanzar, de cierta forma, el planear algo define el lugar o momento en donde se encuentra algo o alguien, plantea a donde se quiere ir e indica paso a paso lo que se debe hacer para llegar hasta allí.', 1),
(3, '| ADD FULLTEXT [INDEX|KEY] [index_name]\n      (index_col_name,...) [index_option] ...\n| ADD SPATIAL [INDEX|KEY] [index_name]\n      (index_col_name,...) [index_option] ...\n| ADD [CONSTRAINT [symbol]]\n      FOREIGN KEY [index_name] (index_col_name,...)\n      reference_definition\n| ALTER [COLUMN] col_name {SET DEFAULT literal | DROP DEFAULT}\n| CHANGE [COLUMN] old_col_name new_col_name column_definition\n      [FIRST|AFTER col_name]\n| MODIFY [COLUMN] col_name column_definition\n      [FIRST | AFTER col_name]\n| DROP [COLUMN] col_name', 1),
(4, 'aaavvv', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planeacion_dimension`
--

CREATE TABLE `planeacion_dimension` (
  `id_planeacion_dimension` int(11) NOT NULL,
  `id_planeacion` int(11) NOT NULL,
  `id_dimension` int(11) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `planeacion_dimension`
--

INSERT INTO `planeacion_dimension` (`id_planeacion_dimension`, `id_planeacion`, `id_dimension`, `estado`) VALUES
(1, 3, 1, 1),
(2, 1, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programacion`
--

CREATE TABLE `programacion` (
  `id_programacion` int(11) NOT NULL,
  `id_docente_asignatura` int(11) NOT NULL,
  `id_grado_grupo_alumno` int(11) NOT NULL,
  `hora_i` int(11) NOT NULL,
  `hora_f` int(11) NOT NULL,
  `dias_semana` varchar(20) NOT NULL,
  `id_jornada` int(11) NOT NULL,
  `idano` int(11) NOT NULL,
  `estado` int(2) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `programacion`
--

INSERT INTO `programacion` (`id_programacion`, `id_docente_asignatura`, `id_grado_grupo_alumno`, `hora_i`, `hora_f`, `dias_semana`, `id_jornada`, `idano`, `estado`) VALUES
(100000, 1, 1, 1, 6, 'lunes', 1, 0, 1),
(100002, 2, 1000, 2, 4, '7', 1, 5, 1),
(100003, 2, 1000, 1, 2, '2', 1, 6, 1),
(100004, 2, 1000, 6, 6, '5', 3, 5, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_docente_asignatura`
--

CREATE TABLE `tbl_docente_asignatura` (
  `id_docente_asignatura` int(11) NOT NULL,
  `codigo_Asignatura` int(11) DEFAULT NULL,
  `documento_Docente` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipodocumento`
--

CREATE TABLE `tipodocumento` (
  `id_tipodocumento` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipodocumento`
--

INSERT INTO `tipodocumento` (`id_tipodocumento`, `nombre`, `estado`) VALUES
(1, 'cc', 0),
(3, 'tarjeta identidad', 1),
(4, 'Pasaporte', 0),
(5, 'nit', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp(6) NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_verified` int(1) NOT NULL DEFAULT '0',
  `estado` int(11) NOT NULL DEFAULT '1',
  `rol` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `is_verified`, `estado`, `rol`) VALUES
(7, 'Juan Esteban', 'juanestebantorovanegasinead@gmail.com', NULL, '$2y$10$oNhJ987PRlyYw1z4QWSNLuPptPOozkXFwoaC6KuyNCLoo7Oxw61fm', NULL, '2019-01-14 02:47:50', '2019-05-14 04:43:42', 1, 0, 'adm'),
(23, 'esteban', 'teteban09@hotmail.com', NULL, '$2y$10$QmvoF3qTDw0REqV/0gouD.83xlj0ApJ0l3q05A6dQ1GyCFRA6370.', NULL, '2019-05-17 04:51:21', '2019-05-17 04:51:21', 1, 1, 'doc'),
(24, 'esteban', 'estebanjimenezruiz10.3@gmail.com', NULL, '$2y$10$Qn813tpn18VP3OR4Sm2tlOb1PjypP.FGDDpPPmHVVBwLQ3C23ruRq', NULL, '2019-05-17 04:52:47', '2019-05-17 04:52:47', 0, 1, 'adm'),
(25, 'moscu', 'nia--@hotmail.com', NULL, '$2y$10$bQ9NJ5AwFId0xpqs5sgSae/AgOyrMpLG7NS.s6l.jRO0WKKiJWfnS', NULL, '2019-05-17 08:39:38', '2019-05-17 08:39:38', 0, 1, 'doc');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_verifications`
--

CREATE TABLE `user_verifications` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user_verifications`
--

INSERT INTO `user_verifications` (`id`, `user_id`, `token`) VALUES
(9, 23, 'KJYgfOXjxaQJONKudyhrrvIwPdKeQO'),
(10, 24, '3s44rVFMGuc1JdpMdDTeuBLGXhV5Gh'),
(11, 25, '9zAt29sQXrc59eJCNDfs7YNbgqbDo4');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `acudiente`
--
ALTER TABLE `acudiente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`iddocente`);

--
-- Indices de la tabla `anolectivo`
--
ALTER TABLE `anolectivo`
  ADD PRIMARY KEY (`idano`);

--
-- Indices de la tabla `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`id_area`);

--
-- Indices de la tabla `asignatura`
--
ALTER TABLE `asignatura`
  ADD PRIMARY KEY (`idasignatura`);

--
-- Indices de la tabla `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`id_departamento`);

--
-- Indices de la tabla `dias`
--
ALTER TABLE `dias`
  ADD PRIMARY KEY (`Id_dia`);

--
-- Indices de la tabla `dimension`
--
ALTER TABLE `dimension`
  ADD PRIMARY KEY (`iddimension`);

--
-- Indices de la tabla `docente`
--
ALTER TABLE `docente`
  ADD PRIMARY KEY (`iddocente`);

--
-- Indices de la tabla `docente_asignatura`
--
ALTER TABLE `docente_asignatura`
  ADD PRIMARY KEY (`id_docente_asignatura`);

--
-- Indices de la tabla `docente_asignatura_planeacion`
--
ALTER TABLE `docente_asignatura_planeacion`
  ADD PRIMARY KEY (`id_docente_asignatura_planeacion`);

--
-- Indices de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_municipio` (`id_municipio`);

--
-- Indices de la tabla `grado`
--
ALTER TABLE `grado`
  ADD PRIMARY KEY (`id_grado`);

--
-- Indices de la tabla `grado_grupo`
--
ALTER TABLE `grado_grupo`
  ADD PRIMARY KEY (`id_grado_grupo`),
  ADD KEY `idgrupo` (`id_grupo`),
  ADD KEY `idgrado` (`id_grado`);

--
-- Indices de la tabla `grado_grupo_alumno`
--
ALTER TABLE `grado_grupo_alumno`
  ADD PRIMARY KEY (`id_grado_grupo_alumno`),
  ADD KEY `fk_grado_grupo_alumno_año` (`idano`),
  ADD KEY `fk_grado_grupo_alumno_gradogrupo` (`id_grado_grupo`),
  ADD KEY `fk_grado_grupo_alumno_docente` (`iddocente`),
  ADD KEY `fk_grado_grupo_alumno_estudiante` (`idestudiante`);

--
-- Indices de la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`id_grupo`);

--
-- Indices de la tabla `hora`
--
ALTER TABLE `hora`
  ADD PRIMARY KEY (`id_hora`);

--
-- Indices de la tabla `jornada`
--
ALTER TABLE `jornada`
  ADD PRIMARY KEY (`id_jornada`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD PRIMARY KEY (`id_municipio`);

--
-- Indices de la tabla `parentesco`
--
ALTER TABLE `parentesco`
  ADD PRIMARY KEY (`id_parentesco`);

--
-- Indices de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indices de la tabla `planeacion`
--
ALTER TABLE `planeacion`
  ADD PRIMARY KEY (`idplaneacion`);

--
-- Indices de la tabla `planeacion_dimension`
--
ALTER TABLE `planeacion_dimension`
  ADD PRIMARY KEY (`id_planeacion_dimension`);

--
-- Indices de la tabla `programacion`
--
ALTER TABLE `programacion`
  ADD PRIMARY KEY (`id_programacion`),
  ADD KEY `fk_programacion_docente_asignatura` (`id_docente_asignatura`),
  ADD KEY `fk_programacion_grado_grupo_alumno` (`id_grado_grupo_alumno`),
  ADD KEY `fk_programacion_jornada` (`id_jornada`);

--
-- Indices de la tabla `tbl_docente_asignatura`
--
ALTER TABLE `tbl_docente_asignatura`
  ADD PRIMARY KEY (`id_docente_asignatura`),
  ADD KEY `fk_docente_asignatura_asignatura` (`codigo_Asignatura`),
  ADD KEY `fk_docente_asignatura_docente` (`documento_Docente`);

--
-- Indices de la tabla `tipodocumento`
--
ALTER TABLE `tipodocumento`
  ADD PRIMARY KEY (`id_tipodocumento`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indices de la tabla `user_verifications`
--
ALTER TABLE `user_verifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_verifications_user_id_foreign` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `acudiente`
--
ALTER TABLE `acudiente`
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `iddocente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `anolectivo`
--
ALTER TABLE `anolectivo`
  MODIFY `idano` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT de la tabla `area`
--
ALTER TABLE `area`
  MODIFY `id_area` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `asignatura`
--
ALTER TABLE `asignatura`
  MODIFY `idasignatura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `departamento`
--
ALTER TABLE `departamento`
  MODIFY `id_departamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `dias`
--
ALTER TABLE `dias`
  MODIFY `Id_dia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `dimension`
--
ALTER TABLE `dimension`
  MODIFY `iddimension` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `docente`
--
ALTER TABLE `docente`
  MODIFY `iddocente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT de la tabla `docente_asignatura`
--
ALTER TABLE `docente_asignatura`
  MODIFY `id_docente_asignatura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `docente_asignatura_planeacion`
--
ALTER TABLE `docente_asignatura_planeacion`
  MODIFY `id_docente_asignatura_planeacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT de la tabla `grado`
--
ALTER TABLE `grado`
  MODIFY `id_grado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `grado_grupo`
--
ALTER TABLE `grado_grupo`
  MODIFY `id_grado_grupo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT de la tabla `grado_grupo_alumno`
--
ALTER TABLE `grado_grupo_alumno`
  MODIFY `id_grado_grupo_alumno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1002;
--
-- AUTO_INCREMENT de la tabla `grupo`
--
ALTER TABLE `grupo`
  MODIFY `id_grupo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT de la tabla `hora`
--
ALTER TABLE `hora`
  MODIFY `id_hora` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `jornada`
--
ALTER TABLE `jornada`
  MODIFY `id_jornada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `municipio`
--
ALTER TABLE `municipio`
  MODIFY `id_municipio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `parentesco`
--
ALTER TABLE `parentesco`
  MODIFY `id_parentesco` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `planeacion`
--
ALTER TABLE `planeacion`
  MODIFY `idplaneacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `planeacion_dimension`
--
ALTER TABLE `planeacion_dimension`
  MODIFY `id_planeacion_dimension` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `programacion`
--
ALTER TABLE `programacion`
  MODIFY `id_programacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100005;
--
-- AUTO_INCREMENT de la tabla `tipodocumento`
--
ALTER TABLE `tipodocumento`
  MODIFY `id_tipodocumento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT de la tabla `user_verifications`
--
ALTER TABLE `user_verifications`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD CONSTRAINT `estudiante_ibfk_1` FOREIGN KEY (`id_municipio`) REFERENCES `municipio` (`id_municipio`);

--
-- Filtros para la tabla `user_verifications`
--
ALTER TABLE `user_verifications`
  ADD CONSTRAINT `user_verifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
