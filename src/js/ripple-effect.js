/**
 * @classdesc Independent and lightweight implementation of ripple wave effect.  
 *
 * @class RippleEffect
 *
 * @example
 *
 * RippleEffect.init();
 *
 * @author Mithun KT
 * @version 1.0
 *
 * @license The MIT License (MIT)
 *
 * Copyright (c) 2015 Mithun KT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var RippleEffect = {

    /**
     * Starts the ripple effect
     * @memberof RippleEffect 
     * @param   {Object} event Object
     */
    start:function(event){
        var element = document.createElement('div');
        var maxDimension = Math.max(event.currentTarget.clientHeight,event.currentTarget.clientWidth);
        var position = {
            x:event.offsetX,
            y:event.offsetY
        };
        var style = {
            'left':(position.x)+'px',
            'top':(position.y)+'px',
            'width':maxDimension+'px',
            'height':maxDimension+'px',
            'margin-left':(maxDimension/-2)+'px',
            'margin-top':(maxDimension/-2)+'px'
        };

        // For event bubbling
        if(!event.target.classList.contains('ripple-effect')){
            position.x  = event.target.offsetLeft+event.offsetX;
            position.y  = event.target.offsetTop+event.offsetY;
        }

        var convertedStyle = JSON.stringify(style).replace(/["{}]/g,'').replace(/,/g,';');
        event.currentTarget.appendChild(element);
        element.classList.add('ripple');
        element.setAttribute('style',convertedStyle);
        element.classList.add('animate');
    },

    /**
     * Stops the ripple effect
     * @memberof RippleEffect 
     * @param   {Object} event Object
     */
    stop:function(event){
        var targetElement = event.currentTarget;
        if(targetElement.classList.contains('ripple')){
            targetElement = event.currentTarget.parentElement;
        }
        setTimeout(function(){
            var rippleElements = targetElement.querySelectorAll('.ripple');
            if(rippleElements && rippleElements.length>0){
                rippleElements.forEach(function(rippleElement) {
                   targetElement.removeChild(rippleElement);
                }, this);
            }
        },1000);
    },

    /**
     * Controlls the ripple effect
     * @memberof RippleEffect 
     * @param   {Object} event Object
     */
    showEffect:function(event){
        if(event.currentTarget.classList.contains('ripple-effect')){
            var targetElement = event.currentTarget;

            RippleEffect.start(event);

            if ('ontouchstart' in window) {
                targetElement.addEventListener('touchend', RippleEffect.stop, false);
                targetElement.addEventListener('touchcancel', RippleEffect.stop, false);
            }

            targetElement.addEventListener('mouseup', RippleEffect.stop, true);
        }
    },

    //Initialize RippleEffect
    init:function(){
        //Event listeners for the elements declared 
        document.querySelectorAll('.ripple-effect').forEach(function(element){
            element.addEventListener('mousedown', RippleEffect.showEffect);
        });
        
        //Touch event handler
        if ('ontouchstart' in window) {
            document.body.addEventListener('touchstart', this.showEffect, false);
        }
    }
}