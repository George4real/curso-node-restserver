const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWt,
    esAdminRol,
    tieneRole
} = require('../middlewares');

const { esRolValido, emailExiste, existeUsuarioPorId,  } = require('../helpers/db-validator');

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch } = require('../controllers/usuarios');
    
const router = Router()


router.get('/', usuariosGet )

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido ),
    validarCampos
] ,usuariosPut)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de mas de 6 letras').isLength({min:6}),
    check('correo', 'El correeo no es valido').isEmail(),
    check('correo').custom( emailExiste),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROL', 'USER_ROL']),
    check('rol').custom( esRolValido ),
    validarCampos
] ,usuariosPost)

router.delete('/:id', [
    validarJWt,
    // esAdminRol,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
] ,usuariosDelete)

router.patch('/', usuariosPatch)


module.exports = router;