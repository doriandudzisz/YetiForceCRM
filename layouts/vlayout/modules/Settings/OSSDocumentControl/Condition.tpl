{*<!--
/*+***********************************************************************************************************************************
 * The contents of this file are subject to the YetiForce Public License Version 1.1 (the "License"); you may not use this file except
 * in compliance with the License.
 * Software distributed under the License is distributed on an "AS IS" basis, WITHOUT WARRANTY OF ANY KIND, either express or implied.
 * See the License for the specific language governing rights and limitations under the License.
 * The Original Code is YetiForce.
 * The Initial Developer of the Original Code is YetiForce. Portions created by YetiForce are Copyright (C) www.yetiforce.com. 
 * All Rights Reserved.
 *************************************************************************************************************************************/
-->*}
<div class="row-fluid conditionRow marginBottom10px" id="cnd_num_{$NUM}">
    <span class="span4">
        <select data-num="{$NUM}" class="select2 chzn-select chzn-done row-fluid field-select" data-placeholder="{vtranslate('LBL_SELECT_FIELD',$QUALIFIED_MODULE)}">
            {foreach key=MODULE_NAME item=FIELD from=$FIELD_LIST}
                <optgroup label='{vtranslate($MODULE_NAME, $MODULE_NAME)}'>
                    {foreach from=$FIELD key=key item=item}
                        <option data-module="{$MODULE_NAME}" value="{$item['name']}" data-uitype="{$item['uitype']}" 
                                data-info="{Vtiger_Util_Helper::toSafeHTML(ZEND_JSON::encode($item['info']))}">{vtranslate($item['label'], $BASE_MODULE)}</option>
                    {/foreach}
                </optgroup>
            {/foreach}
        </select>
    </span>
    <span class="span3">
        <select data-num="{$NUM}" class="select2 chzn-select row-fluid" name="comparator">
            {assign var=CONDITION_LIST value=Settings_OSSDocumentControl_Module_Model::getConditionByType($item['info']['type'])}
            {foreach from=$CONDITION_LIST item=item key=key}
                <option value="{$item}">{$item}</option>
            {/foreach}
        </select>
    </span>
    <span class="span4 fieldUiHolder">
        <input name="val" data-value="value" class="row-fluid" type="text" value="{$CONDITION_INFO['value']|escape}" />
    </span>
    <span class="span1">
        <i class="deleteCondition icon-trash alignMiddle" title="{vtranslate('LBL_DELETE', $QUALIFIED_MODULE)}" onclick="jQuery(this).parents('div#cnd_num_{$NUM}').remove()"></i>
    </span>
</div>