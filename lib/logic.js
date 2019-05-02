/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */


/**
 * Recargar
 * @param {org.usac.tienda4.Recargar} recargar
 * @transaction
 */
async function Recargar(recargar){
    var factory=getFactory();
    var NS='org.usac.tienda4';
    recargar.usuario.saldo+=recargar.dinero;
    return getParticipantRegistry(NS+ '.Usuario')
            .then(function(registroUsuarios){
                return registroUsuarios.update(recargar.usuario);
            })
}
/**
 * Rebastecer
 * @param {org.usac.tienda4.Rebastecer} rebastecer
 * @transaction
 */
async function Rebastecer(rebastecer){
    rebastecer.producto.cantidad+=rebastecer.cantidad;
    let assetRegistry =await getAssetRegistry('org.usac.tienda4.Producto');
    await assetRegistry.update(rebastecer.producto);
}

/**
 * Pago
 * @param {org.usac.tienda4.Pago} pago
 * @transaction
 */
async function Pago(pago){
    pago.producto.cantidad-=pago.cantidadP;
    pago.sucursal.ganancias+=(pago.producto.precio-(pago.producto.precio*pago.producto.porcentaje))*pago.cantidadP;
    pago.usuario.saldo-=(pago.producto.precio-(pago.producto.precio*pago.producto.porcentaje))*pago.cantidadP;
    let assetRegistry =await getAssetRegistry('org.usac.tienda4.Producto');
    await assetRegistry.update(pago.producto);
    var NS='org.usac.tienda4';
    
    
      
}
