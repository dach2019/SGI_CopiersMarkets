-- Creación de base de datos
CREATE DATABASE	SGI_DB;

-- Creación de tablas
USE SGI_DB;

-- Creación de tabla Administrador
CREATE TABLE TblAdministrador(
AdmIdUsuario VarChar (10) Primary Key not null,
AdmContraseña VarChar (60) not null,
AdmNombre Varchar (50) not null,
AdmCargo Varchar (50) not null,
AdmCorreo Varchar (50) not null,
AdmCelular Varchar (50)
);
-- Creación de tabla Usuario
CREATE TABLE TblUsuario(
UsuIdUsuario VarChar (10) Primary Key not null,
UsuContraseña Varchar (60) not null,
UsuNombre Varchar (50) not null,
UsuCargo Varchar (50) not null,
UsuCorreo Varchar (50) not null,
UsuCelular Varchar (50)
);
-- Creación de tabla Item
CREATE TABLE TblItem(
IteCodigoItem VarChar (10) Primary Key not null,
IteTipo Varchar (10) not null,
IteNombre Varchar (50) not null,
IteEspecificaciones Varchar (255) not null,
IteNivelSeguridad Float (10) not null,
IteCantidadActual Float (10) not null
);

-- Creación de tabla Nota Inventario
CREATE TABLE TblNotaInventario(
NotNumeroNota Int(10) Primary key not null AUTO_INCREMENT,
NotFecha Date not null,
NotCodigo Varchar(10) not null,
NotTipo Varchar(10) not null,
NotCantidad Float (10) not null,
NotMotivo Varchar (255) not null,
CONSTRAINT fk_NotCodigo FOREIGN KEY (NotCodigo) REFERENCES TblItem(IteCodigoItem)
);

-- Creación de tabla Pedido
CREATE TABLE TblPedido(
PedNumeroPedido Int Primary Key not null AUTO_INCREMENT,
PedFechaCreacion Date not null,
PedCodigo Varchar (10) not null,
PedCantidad Float (10) not null,
PedFechaCierre Date not null,
PedEstado Varchar (50) not null,
PedObservaciones Varchar (255),
CONSTRAINT fk_PedCodigo FOREIGN KEY (PedCodigo) REFERENCES TblItem(IteCodigoItem)
);
-- Creación de tabla Proveedor
CREATE TABLE TblProveedor(
ProIdProveedor VarChar (10) Primary Key not null,
ProRazonSocial Varchar (50) not null,
ProContacto Varchar (50) not null,
ProTelefono Varchar (10) not null,
ProCorreo Varchar (50) not null,
ProDireccion Varchar (50) not null,
ProObservaciones Varchar (255)
);
-- Creación de tabla Remision
CREATE TABLE TblRemision(
RemNumeroRemision Int Primary Key not null AUTO_INCREMENT,
RemFechaCreacion Date not null,
RemCodigo Varchar (10) not null,
RemCantidad Float (10) not null,
RemOrdenTrabajo int not null,
RemFechaCierre Date,
RemEstado Varchar (50) not null,
RemObservaciones Varchar (255),
CONSTRAINT fk_RemCodigo FOREIGN KEY (RemCodigo) REFERENCES TblItem(IteCodigoItem)
);

