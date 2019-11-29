TW.IDE.Widgets.infotableselector = function () {
    this.widgetIconUrl = function() {
        return  "../Common/extensions/infotableselector_ExtensionPackage/ui/infotableselector/infotableselector.ide.png";
    };

    this.widgetProperties = function () {
        return {
            'name': 'Infotable Selector',
            'description': 'Can help with clearing selection, selecting previous or next row or dynamically letting you know if any rows are selected (useful for hiding and showing various parts of the UI',
            'category': ['Data','Trees'],
            'defaultBindingTargetProperty': 'Data',
            'supportsAutoResize': true,
            'properties': {
                'Data': {
                    'description': 'Data source',
                    'isBindingTarget': true,
                    'isEditable': false,
                    'baseType': 'INFOTABLE',
                    'warnIfNotBoundAsTarget': true
                },
				'RowCount': {
                    'description': 'Row count for the infotable provided in the Data property',
                    'isBindingTarget': false,
                    'isBindingSource': true,
                    'isEditable': false,
                    'baseType': 'NUMBER'
                },
                'SelectRowNumber': {
                    'description': 'Row number to select or is selected in the infotable',
                    'isBindingTarget': true,
                    'isBindingSource': true,
                    'isEditable': false,
                    'baseType': 'NUMBER'
                },
                'MultiSelectRowNumbers': {
                    'description': 'Row numbers to select or are selected in the infotable',
                    'isBindingTarget': true,
                    'isBindingSource': true,
                    'isEditable': false,
                    'baseType': 'INFOTABLE'
                },
                'SelectRowNumberField': {
                    'description': 'Field for the indices of rows to select',
                    'baseType': 'FIELDNAME',
                    'sourcePropertyName': 'MultiSelectRowNumbers'
                },
                'AnyRowsSelected': {
                    'description': 'True when one or rows are selected',
                    'isBindingSource': true,
                    'baseType': 'BOOLEAN',
                    'defaultValue': false
                },
                'NoRowsSelected': {
                    'description': 'True when no rows are selected',
                    'isBindingSource': true,
                    'baseType': 'BOOLEAN',
                    'defaultValue': false
                },
                'Width': {
                    'description': 'Widget width',
                    'defaultValue': 200
                },
                'Height': {
                    'description': 'Widget height',
                    'defaultValue': 28
                }
            }
        };
    };

    this.widgetServices = function () {
        return {
            'ClearSelectedRows': { 'warnIfNotBound': false },
            'SelectFirstRow': { 'warnIfNotBound': false },
            'SelectNextRow': { 'warnIfNotBound': false },
            'SelectPreviousRow': { 'warnIfNotBound': false }
        };
    };

    this.renderHtml = function () {
        var html = '';
        html += '<div class="widget-content widget-infotableselector">Invisible at runtime</div>';
        return html;
    };

    this.validate = function () {
        var result = [];

        return result;
    };
};
