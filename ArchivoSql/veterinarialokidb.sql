-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-12-2023 a las 04:59:57
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 7.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `veterinarialokidb`
--
CREATE DATABASE IF NOT EXISTS `veterinarialokidb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `veterinarialokidb`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidades`
--

CREATE TABLE `especialidades` (
  `especialidad_id` int(11) NOT NULL,
  `nombreEspecialidad` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `especialidades`
--

INSERT INTO `especialidades` (`especialidad_id`, `nombreEspecialidad`) VALUES
(2, 'Gatologo'),
(4, 'Veterinario'),
(5, 'Veterinaria'),
(6, 'neumonología');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pets`
--

CREATE TABLE `pets` (
  `pet_name` varchar(30) NOT NULL,
  `pet_breed` varchar(30) NOT NULL,
  `ago` int(11) NOT NULL,
  `hair_color` varchar(30) NOT NULL,
  `pet_id` int(11) NOT NULL,
  `dni` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pets`
--

INSERT INTO `pets` (`pet_name`, `pet_breed`, `ago`, `hair_color`, `pet_id`, `dni`) VALUES
('pepe', 'pastor aleman', 5, 'rojo', 9, 0),
('lola', 'pekines', 1, 'blanca', 12, 321656),
('lila', 'callejera', 6, 'blanca', 13, 321656),
('pepe', 'atigrado', 5, 'rojo', 14, 321656);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursal`
--

CREATE TABLE `sucursal` (
  `sucursal_id` int(11) NOT NULL,
  `adress` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sucursal`
--

INSERT INTO `sucursal` (`sucursal_id`, `adress`, `city`) VALUES
(4, 'Perito Moreno 4001', 'Buenos Aires'),
(6, 'calle 502', 'CABA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turnos`
--

CREATE TABLE `turnos` (
  `user_id` int(11) NOT NULL,
  `pet_id` int(11) NOT NULL,
  `especialidad_id` int(11) NOT NULL,
  `vet_id` int(11) NOT NULL,
  `turn_date` date NOT NULL,
  `sucursal_id` int(11) NOT NULL,
  `turn_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` int(10) NOT NULL,
  `adress` varchar(50) NOT NULL,
  `ago` int(11) NOT NULL,
  `genere` varchar(30) NOT NULL,
  `dni` int(10) NOT NULL,
  `user` int(10) NOT NULL,
  `password` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `name`, `surname`, `email`, `phone`, `adress`, `ago`, `genere`, `dni`, `user`, `password`) VALUES
(4, 'Pablo', 'Ronco', 'pablo.r@hotmail.com', 2147483647, 'Calle25', 29, 'M', 1234567890, 1, '123'),
(5, 'juan', 'manuel', 'add@hot.com', 457897897, 'calle 60', 30, 'm', 123456987, 2, '123'),
(9, 'pepe', 'sanchez', 'pepe@hot.com', 1546454, 'calle 501', 1, 'Masculino', 321654, 2, '1234'),
(13, 'pepe', 'sanchez', 'pepe@hot.com', 1546454, 'calle 502', 18, 'Neutro', 321659, 2, '1234'),
(17, 'pepe', 'sanchez', 'pepe@hot.com', 1546454, 'calle 502', 1, 'Masculino', 321656, 2, '1234'),
(18, 'pepe', 'sanchez', 'pepi@hot.com', 1546454, 'calle 555', 12, 'Masculino', 5555, 2, '123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `veterinarios`
--

CREATE TABLE `veterinarios` (
  `veterinario_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `ago` varchar(50) NOT NULL,
  `dni` int(8) NOT NULL,
  `title` varchar(50) NOT NULL,
  `titlenumber` int(10) NOT NULL,
  `genere` varchar(30) NOT NULL,
  `adress` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `veterinarios`
--

INSERT INTO `veterinarios` (`veterinario_id`, `name`, `surname`, `ago`, `dni`, `title`, `titlenumber`, `genere`, `adress`, `email`, `phone`) VALUES
(1, 'Gon', 'Rig', '27', 1122334455, 'Veterinario', 556644, 'M', 'Calle 123', 'g.@hotmail.com', 1122334455);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  ADD PRIMARY KEY (`especialidad_id`);

--
-- Indices de la tabla `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`pet_id`);

--
-- Indices de la tabla `sucursal`
--
ALTER TABLE `sucursal`
  ADD PRIMARY KEY (`sucursal_id`);

--
-- Indices de la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD PRIMARY KEY (`turn_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indices de la tabla `veterinarios`
--
ALTER TABLE `veterinarios`
  ADD PRIMARY KEY (`veterinario_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  MODIFY `especialidad_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `pets`
--
ALTER TABLE `pets`
  MODIFY `pet_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `sucursal`
--
ALTER TABLE `sucursal`
  MODIFY `sucursal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `turnos`
--
ALTER TABLE `turnos`
  MODIFY `turn_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `veterinarios`
--
ALTER TABLE `veterinarios`
  MODIFY `veterinario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
