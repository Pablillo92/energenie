-- phpMyAdmin SQL Dump
-- version 3.4.11.1deb2+deb7u1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 27-04-2016 a las 14:28:27
-- Versión del servidor: 5.5.37
-- Versión de PHP: 5.6.18-1~dotdeb+7.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `energenie`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `raspberry`
--

CREATE TABLE IF NOT EXISTS `raspberry` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `ip` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Volcado de datos para la tabla `raspberry`
--

INSERT INTO `raspberry` (`id`, `nombre`, `ip`) VALUES
(13, 'Pablo', '192.168.2.24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rel_user_raspberry`
--

CREATE TABLE IF NOT EXISTS `rel_user_raspberry` (
  `id_user` int(11) NOT NULL,
  `id_raspberry` int(11) NOT NULL,
  KEY `id_user` (`id_user`),
  KEY `id_raspberry` (`id_raspberry`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `rel_user_raspberry`
--

INSERT INTO `rel_user_raspberry` (`id_user`, `id_raspberry`) VALUES
(16, 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `socket`
--

CREATE TABLE IF NOT EXISTS `socket` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_raspberry` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `state` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `rel` enum('1','2','3','4') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_raspberry` (`id_raspberry`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=17 ;

--
-- Volcado de datos para la tabla `socket`
--

INSERT INTO `socket` (`id`, `id_raspberry`, `nombre`, `state`, `active`, `rel`) VALUES
(15, 13, 'Calefacción', 0, 1, '1'),
(16, 13, 'Luz salón', 0, 0, '2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(150) NOT NULL,
  `pass` varchar(150) NOT NULL,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `email`, `pass`, `name`) VALUES
(16, 'tec4pablosaez@gmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 'Pablo');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `rel_user_raspberry`
--
ALTER TABLE `rel_user_raspberry`
  ADD CONSTRAINT `rel_user_raspberry_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rel_user_raspberry_ibfk_2` FOREIGN KEY (`id_raspberry`) REFERENCES `raspberry` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `socket`
--
ALTER TABLE `socket`
  ADD CONSTRAINT `socket_ibfk_1` FOREIGN KEY (`id_raspberry`) REFERENCES `raspberry` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
