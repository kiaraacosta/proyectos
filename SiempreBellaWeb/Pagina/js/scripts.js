/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/

// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });



    // Hacer que todos los formularios de los modales agendar funcionen igual
    document.querySelectorAll('.modal form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Seguridad extra: normalizar cualquier input de hora a :00 antes de procesar
            form.querySelectorAll('input[type="time"]').forEach(inp => {
                if (!inp.value) return;
                const parts = inp.value.split(':');
                if (parts.length >= 2) {
                    const h = parts[0].padStart(2, '0');
                    if (parts[1] !== '00') inp.value = `${h}:00`;
                }
            });

            // Recopilar datos del formulario
            const modal = form.closest('.modal');
            const modalTitle = modal.querySelector('.modal-title')?.textContent || 'Servicio';
            const nombre = form.querySelector('input[type="text"]')?.value || '';
            const correo = form.querySelector('input[type="email"]')?.value || '';
            const fecha = form.querySelector('input[type="date"]')?.value || '';
            const hora = form.querySelector('input[type="time"]')?.value || '';
            
            // Obtener el servicio y precio específicos según el modal
            let servicio = modalTitle.replace('Agendar: ', '').replace('Agendar Promo: ', '');
            let precio = '';
            
            // Intentar obtener información específica del servicio
            const priceInput = form.querySelector('input[readonly][id*="Price"]');
            if (priceInput && priceInput.value && priceInput.value !== '$ -') {
                precio = priceInput.value;
            }
            
            // Para modales con selectores, obtener el servicio específico
            const serviceSelect = form.querySelector('select[id*="Type"], select[id*="Zone"]');
            if (serviceSelect && serviceSelect.value) {
                servicio = serviceSelect.options[serviceSelect.selectedIndex].text;
            }
            
            // Para láser, agregar información del plan
            const laserPlan = form.querySelector('input[name="laserPlan"]:checked');
            if (laserPlan) {
                const planText = form.querySelector(`label[for="${laserPlan.id}"]`)?.textContent || '';
                servicio += ` - ${planText}`;
            }
            
            // Formatear fecha
            let fechaFormateada = fecha;
            if (fecha) {
                const fechaObj = new Date(fecha + 'T00:00:00');
                fechaFormateada = fechaObj.toLocaleDateString('es-UY', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
            }
            
            // Crear contenido HTML para el modal de confirmación
            let contenidoHTML = `
                <div class="mb-3">
                    <p class="text-muted mb-2">Tu turno ha sido agendado exitosamente. A continuación el resumen:</p>
                </div>
                <div class="card border-0 bg-light">
                    <div class="card-body">
                        <div class="mb-3">
                            <div class="d-flex align-items-start">
                                <i class="fas fa-user text-primary me-3 mt-1"></i>
                                <div>
                                    <small class="text-muted d-block">Nombre</small>
                                    <strong>${nombre}</strong>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="d-flex align-items-start">
                                <i class="fas fa-envelope text-primary me-3 mt-1"></i>
                                <div>
                                    <small class="text-muted d-block">Correo</small>
                                    <strong>${correo}</strong>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="d-flex align-items-start">
                                <i class="fas fa-concierge-bell text-primary me-3 mt-1"></i>
                                <div>
                                    <small class="text-muted d-block">Servicio</small>
                                    <strong>${servicio}</strong>
                                </div>
                            </div>
                        </div>
                        ${precio ? `
                        <div class="mb-3">
                            <div class="d-flex align-items-start">
                                <i class="fas fa-dollar-sign text-primary me-3 mt-1"></i>
                                <div>
                                    <small class="text-muted d-block">Precio</small>
                                    <strong>${precio}</strong>
                                </div>
                            </div>
                        </div>
                        ` : ''}
                        <div class="mb-3">
                            <div class="d-flex align-items-start">
                                <i class="fas fa-calendar-alt text-primary me-3 mt-1"></i>
                                <div>
                                    <small class="text-muted d-block">Fecha</small>
                                    <strong>${fechaFormateada}</strong>
                                </div>
                            </div>
                        </div>
                        <div class="mb-0">
                            <div class="d-flex align-items-start">
                                <i class="fas fa-clock text-primary me-3 mt-1"></i>
                                <div>
                                    <small class="text-muted d-block">Hora</small>
                                    <strong>${hora}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="alert alert-info mt-3 mb-0">
                    <i class="fas fa-info-circle me-2"></i>
                    <small>Te enviaremos un correo de confirmación a <strong>${correo}</strong></small>
                </div>
            `;
            
            // Insertar contenido en el modal de confirmación
            const confirmacionContenido = document.getElementById('confirmacionContenido');
            if (confirmacionContenido) {
                confirmacionContenido.innerHTML = contenidoHTML;
            }
            
            // Cerrar modal de agenda
            if (modal) {
                const modalInstance = bootstrap.Modal.getOrCreateInstance(modal);
                modalInstance.hide();
            }
            
            // Mostrar modal de confirmación
            const modalConfirmacion = new bootstrap.Modal(document.getElementById('modalConfirmacion'));
            modalConfirmacion.show();
            
            // Resetear formulario
            form.reset();
        });
    });

    // Forzar horarios en punto (minutos "00") en todos los inputs de hora
    const timeInputs = document.querySelectorAll('input[type="time"]');
    timeInputs.forEach(input => {
        // Solo permitir incrementos de 1 hora en el selector nativo
        input.step = 3600; // segundos (3600 = 1 hora)
        // Establecer rango horario de 9:00 a 19:00
        input.min = '09:00';
        input.max = '19:00';
        // Mensaje de ayuda (tooltip del navegador)
        input.title = 'Seleccioná una hora en punto entre 9:00 y 19:00 (minutos 00)';

        // Normalizar a :00 cuando el valor cambie o pierda foco
        const normalize = () => {
            if (!input.value) return;
            const parts = input.value.split(':');
            if (parts.length >= 2) {
                const h = parts[0].padStart(2, '0');
                const m = parts[1];
                if (m !== '00') {
                    input.value = `${h}:00`;
                }
            }
        };
        input.addEventListener('change', normalize);
        input.addEventListener('blur', normalize);

        // Texto de ayuda visible debajo del campo de hora
        if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('form-text-time-help')) {
            const help = document.createElement('div');
            help.className = 'form-text form-text-time-help';
            help.textContent = 'Horario de atención: 9:00 a 19:00 (horas en punto).';
            input.insertAdjacentElement('afterend', help);
        }
    });

        // ------------------ Mapas de precios ------------------
        // Depilación con láser (valores proporcionados por el usuario)
        const LASER_PRICES = {
            'Bikini': { '6': 4800, '3': Math.round(4800/2) },
            'Cavado': { '6': 8990, '3': Math.round(8990/2) },
            'Cavado completo (con tira de cola)': { '6': 9590, '3': Math.round(9590/2) },
            'Cavado completo + axilas': { '6': 12990, '3': Math.round(12990/2) },
            'Cavado completo + axilas + media pierna': { '6': 19190, '3': Math.round(19190/2) },
            'Cavado completo + axilas + pierna entera': { '6': 22990, '3': Math.round(22990/2) },
            'Cavado completo + pierna entera': { '6': 18990, '3': Math.round(18990/2) },
            'Media pierna + axila': { '6': 13990, '3': Math.round(13990/2) },
            'Pierna entera + axila': { '6': 17990, '3': Math.round(17990/2) },
            'Pierna entera': { '6': 14990, '3': Math.round(14990/2) },
            'Media pierna': { '6': 9000, '3': Math.round(9000/2) },
            'Axilas': { '6': 6990, '3': Math.round(6990/2) },
            'Rostro completo': { '6': 10990, '3': Math.round(10990/2) },
            'Bozo': { '6': 5690, '3': Math.round(5690/2) },
            'Abdomen completo': { '6': 7590, '3': Math.round(7590/2) },
            'Espalda baja': { '6': 4990, '3': Math.round(4990/2) },
            'Glúteos': { '6': 7590, '3': Math.round(7590/2) },
            'Brazo': { '6': 7590, '3': Math.round(7590/2) }
        };
        // Reusable: inicializa inputs de precio dentro de un modal
        // options: { selectSelector, priceInputSelector, pricesMap, radioName (optional), defaultSelectValue (optional), formatter (optional) }
        function setupPriceModal(modalEl, options) {
            if (!modalEl) return;
            modalEl.addEventListener('show.bs.modal', () => {
                if (modalEl.dataset.priceInitialized === 'true') return;

                const selectEl = options.selectSelector ? modalEl.querySelector(options.selectSelector) : null;
                const priceEl = modalEl.querySelector(options.priceInputSelector);
                const radioName = options.radioName || null;
                const pricesMap = options.pricesMap || {};
                const defaultSelectValue = options.defaultSelectValue || null;
                const formatter = options.formatter || (v => v);

                if (!priceEl) return;

                if (selectEl && defaultSelectValue && !selectEl.value) selectEl.value = defaultSelectValue;

                const update = () => {
                    let key = selectEl ? selectEl.value : null;
                    // para casos de radios (láser), obtener plan seleccionado
                    let plan = '6';
                    if (radioName) {
                        const checked = modalEl.querySelector(`input[name="${radioName}"]:checked`);
                        if (checked) plan = checked.value;
                    }

                    let val;
                    if (key && pricesMap[key]) {
                        val = pricesMap[key];
                        // si es un objeto (como LASER_PRICES con planes) obtener por plan
                        if (typeof val === 'object' && !Array.isArray(val)) {
                            val = val[plan];
                        }
                    }

                    if (Array.isArray(val)) {
                        // mostrar rango
                        const fmt = new Intl.NumberFormat('es-UY');
                        priceEl.value = `$ ${fmt.format(val[0])} – $ ${fmt.format(val[1])}`;
                    } else if (typeof val === 'number') {
                        priceEl.value = `$ ${new Intl.NumberFormat('es-UY').format(val)}`;
                    } else {
                        priceEl.value = '$ -';
                    }
                };

                if (selectEl) selectEl.addEventListener('change', update);
                if (radioName) {
                    modalEl.querySelectorAll(`input[name="${radioName}"]`).forEach(r => r.addEventListener('change', update));
                }

                // Primera actualización
                update();

                modalEl.dataset.priceInitialized = 'true';
            });
        }

        // ------------------ Kapping (Modal #modalAgenda4) ------------------
        const KAPPING_PRICES = {
            'Kapping y semi': 990,
            'Kapping y semi con french': 1090,
            'Kapping y semi hasta 2 diseños': 1090,
            'Kapping y semi full diseño': [1190, 1290],
            'Retirado kapping de otra colega': 250
        };

        // ------------------ Esmaltado (Modal #modalAgenda3) ------------------
        const ESMALTADO_PRICES = {
            'Esmaltado semi': 800,
            'Esmaltado semi french': 900,
            'Esmaltado semi hasta 2 diseños': 950,
            'Esmaltado semi full diseño': 1000,
            'Retirado semi de otra colega': 200
        };

        // Esmaltado (initialized by generator)

        // ------------------ Estética de Pies (Modal #modalAgenda9) ------------------
        const PIES_PRICES = {
            'Estética de pies': 690,
            'Estética de pies con esmaltado común': 790,
            'Estética de pies con semi': 990,
            'Retirado semi de otra colega': 200,
            'Reconstrucción de uña': 180
        };

        // Pies (initialized by generator)

        // ------------------ Esculpidas (Modal #modalAgenda5) ------------------
        const ESCULPIDAS_PRICES = {
            'Esculpidas': 500
        };

        // Esculpidas (initialized by generator)

        // ------------------ Cejas (Modal #modalAgenda7) ------------------
        const CEJAS_PRICES = {
            'Perfilado': 1000
        };

        // ------------------ Depilación con cera (Modal #modalAgenda1)
        const CERA_PRICES = {
            'Bozo': 180,
            'Cejas': 250,
            'Mentón': 180,
            'Patillas': 350,
            'Rostro completo': 790,
            'Pierna entera': 650,
            'Media pierna': 500,
            'Axilas': 250,
            'Bikini': 400,
            'Bikini, pelvis': 600,
            'Cavado': 650,
            'Abdomen': 400,
            'Glúteos': 400,
            'Brazo completo': 500,
            'Medio brazo': 300,
            'Dedos pies': 200,
            'Cintura': 300,
            'Empeine': 200,
            'Cavado integral': 790,
            'Tira': 200,
            'Tira de ombligo': 200
        };

        // Otros servicios sueltos
        const COSMETOLOGIA_PRICES = {
            'Limpieza de cutis': 1350
        };
        const PROGRESIVO_PRICES = {
            'Progresivo': 2090
        };
        const BRONCEADO_PRICES = {
            'Bronceado': 990
        };
        const PESTANAS_PRICES = {
            'Lifting de pestañas': 1290
        };

        // Cejas (initialized by generator)

    // --- Dynamic modals generator -------------------------------------------------
    // Services definition using the same modal IDs that exist in the HTML buttons
    const services = [
        { modalNumber: 1, title: 'Depilación con cera', selectId: 'ceraType', priceInputId: 'ceraPrice', priceTableId: 'ceraPriceTable', pricesMap: CERA_PRICES },
        { modalNumber: 2, title: 'Depilación con láser', selectId: 'laserZone', priceInputId: 'laserPrice', priceTableId: 'laserPriceTable', pricesMap: LASER_PRICES, radioName: 'laserPlan', radioDefault: '6' },
        { modalNumber: 3, title: 'Esmaltado', selectId: 'esmaltadoType', priceInputId: 'esmaltadoPrice', priceTableId: 'esmaltadoPriceTable', pricesMap: ESMALTADO_PRICES },
        { modalNumber: 4, title: 'Kapping', selectId: 'kappingType', priceInputId: 'kappingPrice', priceTableId: 'kappingPriceTable', pricesMap: KAPPING_PRICES },
        { modalNumber: 5, title: 'Esculpidas', selectId: 'esculpidasType', priceInputId: 'esculpidasPrice', priceTableId: 'esculpidasPriceTable', pricesMap: ESCULPIDAS_PRICES },
        { modalNumber: 6, title: 'Pestañas', selectId: 'pestanasType', priceInputId: 'pestanasPrice', priceTableId: 'pestanasPriceTable', pricesMap: PESTANAS_PRICES },
        { modalNumber: 7, title: 'Cejas', selectId: 'cejasType', priceInputId: 'cejasPrice', priceTableId: 'cejasPriceTable', pricesMap: CEJAS_PRICES },
        { modalNumber: 8, title: 'Bronceado', selectId: 'bronceadoType', priceInputId: 'bronceadoPrice', priceTableId: 'bronceadoPriceTable', pricesMap: BRONCEADO_PRICES },
        { modalNumber: 9, title: 'Pies', selectId: 'piesType', priceInputId: 'piesPrice', priceTableId: 'piesPriceTable', pricesMap: PIES_PRICES },
    { modalNumber: 10, title: 'Masajes/Aparatología', promoNote: `MASAJES COMBINADOS:
reductor, modelador, drenaje linfático y/o relax.
En todo el cuerpo.

La duración de la sesión: es de 50 minutos✨

Sesión individual $1700.

CUPONERAS con el descuento incluido ✨

La cupo x 4 sesiones te queda en $6100

La cupo x 8 sesiones te queda en $11300

La cupo x 12 sesiones te queda en $15500` },
        { modalNumber: 11, title: 'Cosmetología', selectId: 'cosmetologiaType', priceInputId: 'cosmetologiaPrice', priceTableId: 'cosmetologiaPriceTable', pricesMap: COSMETOLOGIA_PRICES },
        { modalNumber: 12, title: 'Progresivo', selectId: 'progresivoType', priceInputId: 'progresivoPrice', priceTableId: 'progresivoPriceTable', pricesMap: PROGRESIVO_PRICES },
    // promos (únicas)
    { promoOnly: true, promoNumber: 1, title: 'Kapping + estética de pies con semi', priceInputId: 'promo1Price', priceValue: '$ 1.890' },
    { promoOnly: true, promoNumber: 2, title: 'Estética de pies y manos con semi', priceInputId: 'promo2Price', priceValue: '$ 1.500' }
    ];

    function generateServiceModals() {
        const container = document.getElementById('modalContainer');
        if (!container) return;

        // helper to format price values with $ and thousand separators
        const fmt = (v) => {
            if (v == null || v === '-') return '-';
            if (Array.isArray(v) && v.length === 2 && typeof v[0] === 'number' && typeof v[1] === 'number') {
                return `$ ${new Intl.NumberFormat('es-UY').format(v[0])} – $ ${new Intl.NumberFormat('es-UY').format(v[1])}`;
            }
            if (typeof v === 'number') return `$ ${new Intl.NumberFormat('es-UY').format(v)}`;
            // if it's an object (like laser plan maps), return '-' as fallback here
            return String(v);
        };

        services.forEach(s => {
            const idAttr = s.promoOnly ? `modalPromo${s.promoNumber}` : `modalAgenda${s.modalNumber}`;

            const modal = document.createElement('div');
            modal.className = 'modal fade';
            modal.id = idAttr;
            modal.tabIndex = -1;
            modal.setAttribute('aria-hidden', 'true');

            const dialog = document.createElement('div');
            dialog.className = 'modal-dialog modal-lg';

            const content = document.createElement('div');
            content.className = 'modal-content';

            const header = document.createElement('div');
            header.className = 'modal-header';
            const h5 = document.createElement('h5');
            h5.className = 'modal-title';
            h5.textContent = s.title;
            const btnClose = document.createElement('button');
            btnClose.type = 'button';
            btnClose.className = 'btn-close';
            btnClose.setAttribute('data-bs-dismiss', 'modal');
            header.appendChild(h5);
            header.appendChild(btnClose);

            const body = document.createElement('div');
            body.className = 'modal-body';

            // Form
            const form = document.createElement('form');

            if (s.promoOnly) {
                const promoBox = document.createElement('div');
                promoBox.className = 'mb-3 p-3 border rounded bg-light text-start';
                const fw = document.createElement('div');
                fw.className = 'fw-bold';
                fw.textContent = 'Promo Especial — Siempre Bella';
                promoBox.appendChild(fw);
                form.appendChild(promoBox);

                const priceDiv = document.createElement('div');
                priceDiv.className = 'mb-3';
                const label = document.createElement('label');
                label.className = 'form-label';
                label.setAttribute('for', s.priceInputId);
                label.textContent = 'Precio Promocional';
                const input = document.createElement('input');
                input.id = s.priceInputId;
                input.className = 'form-control';
                input.type = 'text';
                input.readOnly = true;
                input.value = s.priceValue || '$ -';
                priceDiv.appendChild(label);
                priceDiv.appendChild(input);
                form.appendChild(priceDiv);
            } else {
                const info = document.createElement('div');
                info.className = 'mb-3 p-3 border rounded bg-light text-start';
                const fw = document.createElement('div');
                fw.className = 'fw-bold';
                fw.textContent = s.title;
                const small = document.createElement('div');
                small.className = 'small text-muted';
                if (s.promoNote) {
                    // permitir saltos de línea en la descripción usando <br>
                    small.innerHTML = String(s.promoNote).replace(/\n/g, '<br>');
                } else {
                    small.textContent = '';
                }
                info.appendChild(fw);
                info.appendChild(small);
                form.appendChild(info);

                if (s.selectId && s.pricesMap) {
                    const selectDiv = document.createElement('div');
                    selectDiv.className = 'mb-3';
                    const label = document.createElement('label');
                    label.className = 'form-label';
                    label.setAttribute('for', s.selectId);
                    label.textContent = s.selectId.includes('Zone') ? 'Zona del cuerpo' : 'Tipo';
                    const select = document.createElement('select');
                    select.id = s.selectId;
                    select.className = 'form-select';
                    Object.keys(s.pricesMap).forEach(key => {
                        const opt = document.createElement('option');
                        opt.value = key;
                        opt.textContent = key;
                        select.appendChild(opt);
                    });
                    selectDiv.appendChild(label);
                    selectDiv.appendChild(select);
                    form.appendChild(selectDiv);
                }

                if (s.radioName) {
                    const radioDiv = document.createElement('div');
                    radioDiv.className = 'mb-3';
                    const label = document.createElement('label');
                    label.className = 'form-label d-block';
                    label.textContent = 'Plan';
                    radioDiv.appendChild(label);
                    ['6','3'].forEach(val => {
                        const fd = document.createElement('div');
                        fd.className = 'form-check form-check-inline';
                        const input = document.createElement('input');
                        input.className = 'form-check-input';
                        input.type = 'radio';
                        input.name = s.radioName;
                        input.value = val;
                        if (val === s.radioDefault) input.checked = true;
                        const lab = document.createElement('label');
                        lab.className = 'form-check-label';
                        lab.textContent = val === '6' ? 'Cuponera 6 sesiones' : 'Cuponera 3 sesiones';
                        fd.appendChild(input);
                        fd.appendChild(lab);
                        radioDiv.appendChild(fd);
                    });
                    form.appendChild(radioDiv);
                }

                if (s.pricesMap) {
                    const priceDiv = document.createElement('div');
                    priceDiv.className = 'mb-3';
                    const priceLabel = document.createElement('label');
                    priceLabel.className = 'form-label';
                    priceLabel.setAttribute('for', s.priceInputId);
                    priceLabel.textContent = 'Precio';
                    const priceInput = document.createElement('input');
                    priceInput.id = s.priceInputId;
                    priceInput.className = 'form-control';
                    priceInput.type = 'text';
                    priceInput.readOnly = true;
                    priceInput.value = '$ -';
                    priceDiv.appendChild(priceLabel);
                    priceDiv.appendChild(priceInput);
                    form.appendChild(priceDiv);

                    // price table toggle (custom JS toggle to avoid bootstrap conflicts)
                    const toggleBtn = document.createElement('button');
                    toggleBtn.className = 'btn btn-outline-secondary w-100 mb-3';
                    toggleBtn.type = 'button';
                    toggleBtn.setAttribute('data-price-toggle', 'true');
                    toggleBtn.setAttribute('data-price-target', `#${s.priceTableId}`);
                    toggleBtn.setAttribute('aria-expanded', 'false');
                    toggleBtn.setAttribute('aria-controls', s.priceTableId);
                    toggleBtn.textContent = 'Ver tabla de precios completa';
                    form.appendChild(toggleBtn);

                    // price table container (our own collapse control)
                    const tableWrap = document.createElement('div');
                    tableWrap.className = 'price-collapse';
                    tableWrap.id = s.priceTableId;
                    tableWrap.setAttribute('aria-hidden', 'true');
                    const tableResp = document.createElement('div');
                    tableResp.className = 'table-responsive';
                    const table = document.createElement('table');
                    table.className = 'table table-sm align-middle';
                    const thead = document.createElement('thead');
                    const trh = document.createElement('tr');
                    // determine headers
                    if (s.modalNumber === 2) {
                        trh.innerHTML = '<th>ZONA</th><th>Cuponera 6 sesiones</th><th>Cuponera 3 sesiones</th>';
                    } else {
                        trh.innerHTML = '<th>Servicio</th><th>Precio</th>';
                    }
                    thead.appendChild(trh);
                    table.appendChild(thead);
                    const tbody = document.createElement('tbody');
                    Object.keys(s.pricesMap || {}).forEach(k => {
                        const tr = document.createElement('tr');
                        if (s.modalNumber === 2) {
                            const vals = s.pricesMap[k] || {};
                            const six = vals && (typeof vals === 'object') ? vals[6] : vals;
                            const three = vals && (typeof vals === 'object') ? vals[3] : null;
                            tr.innerHTML = `<td>${k}</td><td>${six ? fmt(six) : '-'}</td><td>${three ? fmt(three) : '-'}</td>`;
                        } else {
                            const raw = s.pricesMap[k];
                            if (Array.isArray(raw) && raw.length === 2 && typeof raw[0] === 'number') {
                                tr.innerHTML = `<td>${k}</td><td>${fmt(raw)}</td>`;
                            } else if (typeof raw === 'number') {
                                tr.innerHTML = `<td>${k}</td><td>${fmt(raw)}</td>`;
                            } else {
                                tr.innerHTML = `<td>${k}</td><td>${String(raw)}</td>`;
                            }
                        }
                        tbody.appendChild(tr);
                    });
                    table.appendChild(tbody);
                    tableResp.appendChild(table);
                    tableWrap.appendChild(tableResp);
                    form.appendChild(tableWrap);
                }
            }

            // common fields (name, email, date, time)
            const hr = document.createElement('hr');
            hr.className = 'my-3';
            form.appendChild(hr);
            ['Nombre','Correo','Fecha del turno','Hora'].forEach((lbl, idx) => {
                const div = document.createElement('div');
                div.className = 'mb-3';
                const label = document.createElement('label');
                label.className = 'form-label';
                label.textContent = lbl;
                const input = document.createElement('input');
                input.className = 'form-control';
                if (idx === 1) input.type = 'email';
                else if (idx === 2) input.type = 'date';
                else if (idx === 3) {
                    input.type = 'time';
                    // Forzar horas en punto: step=3600, rango 09:00-19:00 y título explicativo
                    input.step = 3600; // segundos
                    input.min = '09:00';
                    input.max = '19:00';
                    input.title = 'Seleccioná una hora en punto entre 9:00 y 19:00 (minutos 00)';
                    input.placeholder = 'hh:00';

                    // Normalizar a :00 cuando cambie o pierda foco
                    const normalize = () => {
                        if (!input.value) return;
                        const parts = input.value.split(':');
                        if (parts.length >= 2) {
                            const h = parts[0].padStart(2, '0');
                            if (parts[1] !== '00') input.value = `${h}:00`;
                        }
                    };
                    input.addEventListener('change', normalize);
                    input.addEventListener('blur', normalize);

                    // Añadir texto de ayuda debajo del campo para aclarar la restricción
                    const help = document.createElement('div');
                    help.className = 'form-text';
                    help.textContent = 'Horario de atención: 9:00 a 19:00. Seleccioná una hora en punto (minutos 00).';
                    div.appendChild(label);
                    div.appendChild(input);
                    div.appendChild(help);
                    form.appendChild(div);
                    return; // ya appended
                }
                else input.type = 'text';
                input.required = true;
                div.appendChild(label);
                div.appendChild(input);
                form.appendChild(div);
            });

            const submit = document.createElement('button');
            submit.type = 'submit';
            submit.className = 'btn btn-primary w-100';
            submit.textContent = 'Confirmar Turno';
            form.appendChild(submit);

            body.appendChild(form);
            content.appendChild(header);
            content.appendChild(body);
            dialog.appendChild(content);
            modal.appendChild(dialog);
            container.appendChild(modal);
        });

        // After modals are in DOM, initialize price behaviors
        services.forEach(s => {
            if (s.promoOnly) return;
            if (!s.pricesMap) return;
            const modalEl = document.getElementById(`modalAgenda${s.modalNumber}`);
            if (!modalEl) return;
            setupPriceModal(modalEl, {
                selectSelector: `#${s.selectId}`,
                priceInputSelector: `#${s.priceInputId}`,
                pricesMap: s.pricesMap,
                radioName: s.radioName,
                defaultSelectValue: Object.keys(s.pricesMap || {})[0],
                formatter: v => (typeof v === 'number' ? `$ ${v}` : v)
            });
        });

        // Attach collapse guards for dynamically created toggles
        attachPriceCollapseGuards();
    }

    // generate on load
    generateServiceModals();

        // ------------------ Guard para los colapsibles de tablas de precio (CSS-driven) ------------------
        // Animamos max-height/opacity para evitar flicker y no dependemos de Bootstrap collapse
        function attachPriceCollapseGuards(){
            const buttons = document.querySelectorAll('button[data-price-toggle]');
            if (!buttons || buttons.length === 0) {
                console.warn('attachPriceCollapseGuards: no price table toggle buttons found.');
            }
            buttons.forEach(btn => {
                if (btn.dataset.guardAttached === 'true') return;
                const targetSel = btn.getAttribute('data-price-target');
                if (!targetSel) return;
                const el = document.querySelector(targetSel);
                if (!el) return;

                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const isOpen = el.classList.contains('open');
                    if (isOpen) {
                        // close
                        el.style.maxHeight = el.scrollHeight + 'px';
                        void el.offsetHeight;
                        el.style.maxHeight = '0px';
                        el.classList.remove('open');
                        el.setAttribute('aria-hidden', 'true');
                        btn.setAttribute('aria-expanded', 'false');
                        // cleanup
                        el.addEventListener('transitionend', function handler(){
                            if (!el.classList.contains('open')) el.style.maxHeight = '';
                            el.removeEventListener('transitionend', handler);
                        });
                    } else {
                        // open
                        el.classList.add('open');
                        el.setAttribute('aria-hidden', 'false');
                        btn.setAttribute('aria-expanded', 'true');
                        el.style.maxHeight = el.scrollHeight + 'px';
                        el.addEventListener('transitionend', function handler(){
                            if (el.classList.contains('open')) el.style.maxHeight = '';
                            el.removeEventListener('transitionend', handler);
                        });
                    }
                });

                // ensure tables close when modal hides
                const modalEl = btn.closest('.modal');
                if (modalEl) {
                    modalEl.addEventListener('hidden.bs.modal', () => {
                        if (el.classList.contains('open')) {
                            el.style.maxHeight = el.scrollHeight + 'px';
                            void el.offsetHeight;
                            el.style.maxHeight = '0px';
                            el.classList.remove('open');
                            el.setAttribute('aria-hidden', 'true');
                            btn.setAttribute('aria-expanded', 'false');
                            el.addEventListener('transitionend', function handler(){
                                if (!el.classList.contains('open')) el.style.maxHeight = '';
                                el.removeEventListener('transitionend', handler);
                            });
                        }
                    });
                }

                btn.dataset.guardAttached = 'true';
            });
        }
});
