/*+***********************************************************************************************************************************
 * The contents of this file are subject to the YetiForce Public License Version 1.1 (the "License"); you may not use this file except
 * in compliance with the License.
 * Software distributed under the License is distributed on an "AS IS" basis, WITHOUT WARRANTY OF ANY KIND, either express or implied.
 * See the License for the specific language governing rights and limitations under the License.
 * The Original Code is YetiForce.
 * The Initial Developer of the Original Code is YetiForce. Portions created by YetiForce are Copyright (C) www.yetiforce.com. 
 * All Rights Reserved.
 *************************************************************************************************************************************/
function OSSProjectTemplatesEdit() {

    this.getNextStep = function() {
        var thisInstance = this;

        jQuery("#next_step_button").on('click', function() {
            var nextStep = jQuery('input[name="next_step"]'),
                    params = {},
                    step = jQuery(nextStep).val();

            params.data = {view: 'Steps', parent: 'Settings', module: 'OSSProjectTemplates', step: step}

            AppConnector.request(params).then(function(data) {
                jQuery('#step').html(data);

                if ('Step2' == step) {
                    jQuery('#Step1').removeClass('active');
                    jQuery('#Step2').addClass('active');
                    jQuery(nextStep).val('End');
                } else if ('End' == step) {
                    location.href = 'index.php?module=OSSProjectTemplates&parent=Settings&view=Index'
                }
            });
        });
    },
            this.validProjectForm = function(formName) {
                var thisInstance = this;

                jQuery('form[name="' + formName + '"] button:submit').on('click', function(e) {
                    var formField = jQuery(this).parents('form').find('select,input,textarea'),
                            status = true;

                    jQuery(formField).each(function(index, element) {
                        if (jQuery(element).hasClass('required')) {
                            var elementVal = jQuery(element).val();

                            if ('' == elementVal) {
                                status = false;
                            }
                        }
                    });

                    if (!status) {
                        var msg = "Wypełnij pola wymagane";
                        thisInstance.showErrorMessage(msg);
                    }

                    return status;
                });
            },
            this.showErrorMessage = function(info) {
                var params = {
                    title: app.vtranslate('JS_ERROR'),
                    text: info,
                    animation: true
                };

                Vtiger_Helper_Js.showPnotify(params);
            },
            this.edtProjectTpl = function() {
                var thisInstance = this;
                
                jQuery('a.edit_tpl').on('click', function() {
                    var tpl_id = jQuery(this).parents('tr').data('id'),
                    params = {};
                    params.data = {module: 'OSSProjectTemplates', parent: 'Settings', action: 'GetTplInfo', tpl_id: tpl_id, base_module: 'Project'}
                    params.async = false;

                    AppConnector.request(params).then(function(data) {
                        if (data.success === true) {
                            jQuery('[name="tpl_id"]').val(tpl_id);
							console.log(data.result);
                            for (var val in data.result) {
                              //  console.log(val);
                                var isJson = thisInstance.isJsonArray(data.result[val]);
                             //    console.log(isJson);                              
                                if (!isJson) {
                                    jQuery('[name="' + val + '"]').val(data.result[val]);
                                } else {
                                    var tabValue = JSON.parse(data.result[val]);
                                    jQuery('#' + val + '_edit').val(tabValue).trigger('liszt:updated');
                                }
                                var dateIntervalCheckbox = jQuery('[name="' + val + '_day_type"]');

                                var dateIntervalInput = jQuery('[name="' + val + '_day"]');
                                if (jQuery(dateIntervalInput).length > 0 && data.result[val] === 'num_day') {
                                    jQuery(dateIntervalInput).val(data.result[val + '_day']);
                                    jQuery(dateIntervalInput).removeAttr('readonly');

                                    if (jQuery(dateIntervalCheckbox).length > 0 && data.result[val] === 'num_day') {
                                        jQuery(dateIntervalCheckbox).removeAttr('disabled');
                                    }
                                }

                                if (jQuery(dateIntervalCheckbox).length > 0 && data.result[val] === 'num_day') {
                                    if (data.result[val + '_day_type'] === 'on') {
                                        jQuery(dateIntervalCheckbox).attr('checked', 'checked');
                                        jQuery(dateIntervalCheckbox).removeAttr('disabled');
                                    }
                                }
                            }
                        }
                    });

                jQuery('form[name="edit_project_form"] select.select-date').on('change', function() {
                    var selectValue = jQuery(this).val();
                    var selectName = this.name;
                    var input = jQuery('input[name="' + selectName + '_day"]');
                    var  checkbox = jQuery('input[name="' + selectName + '_day_type"]');

                    if ('num_day' === selectValue) {
                        jQuery(input).removeAttr('readonly');
                        jQuery(checkbox).removeAttr('disabled');
                    } else {
                        jQuery(input).attr('readonly', 'readonly');
                        jQuery(checkbox).attr('disabled', 'disabled');
                    }

                });
					
                });
					
            },
            this.selectDateEvent = function() {
                jQuery('form[name="project_form"] select.select-date').on('change', function() {
                    var selectValue = jQuery(this).val();
                    var selectName = this.name;
                    var input = jQuery('input[name="' + selectName + '_day"]')[0],
                            checkbox = jQuery('input[name="' + selectName + '_day_type"]')[0];

                    if ('num_day' === selectValue) {
                        jQuery(input).removeAttr('readonly');
                        jQuery(checkbox).removeAttr('disabled');
                    } else {
                        jQuery(input).attr('readonly', 'readonly');
                        jQuery(checkbox).attr('disabled', 'disabled');
                    }

                })
            },
            
			
			
			
			
            this.isNumber = function(formName) {
                var thisInstance = this;

                jQuery('form[name="' + formName + '"] button:submit').on('click', function(e) {
                    var formField = jQuery(this).parents('form').find('input.day-input'),
                            state = true;

                    jQuery(formField).each(function() {
                        var readonly = jQuery(this).attr('readonly');

                        if (readonly !== 'readonly') {
                            var val = jQuery(this).val();
                            state = !isNaN(parseFloat(val)) && isFinite(val);
                        }
                    })

                    if (!state) {
                        var msg = "Pole z liczbą dni ma nieprawidłową wartość";
                        thisInstance.showErrorMessage(msg);
                    }

                    return state;
                })
            },
            this.enableUninstallButton = function() {
                jQuery('input[name="status"]').on('change', function() {
                    var status = jQuery(this).attr('checked');

                    if (status === 'checked') {
                        jQuery('#confirm_unistall').removeAttr('disabled');
                    } else {
                        jQuery('#confirm_unistall').attr('disabled', 'disabled');
                    }
                })
            },
            this.isJsonArray = function(value) {
                try
                {
                    var test = jQuery.parseJSON(value);
                    var res = Object.prototype.toString.call( test );
                    if (res === '[object Array]') {
                        return true;
                    }
                    
                    return false;
                }
                catch (e)
                {
                    return false;
                }
            },
            this.registerEvents = function() {
                this.getNextStep();
                this.validProjectForm('project_form'); //validacja po kliknieciu zapisz
                this.validProjectForm('edit_project_form');
                this.edtProjectTpl(); // sczytuje wartosci z tablicy i uzupełnia pola
                this.isNumber('project_form'); // sprawdzenie imputow przy dacie (liczba dni)
                this.selectDateEvent(); // ustawienie inputow i checkbox'ow aktywnych lub nie	
                this.enableUninstallButton();
            }
}

jQuery(document).ready(function() {
    var pt = new OSSProjectTemplatesEdit();
    pt.registerEvents();
})