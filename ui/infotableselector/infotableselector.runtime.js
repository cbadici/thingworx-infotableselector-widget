(function () {
    var addedDefaultStyles = false;

    TW.Runtime.Widgets.infotableselector = function () {
        var thisWidget = this;
        var currentSelectedRowNumber = undefined;
        var numRows = 0;

        this.runtimeProperties = function () {
            return {
                'needsDataLoadingAndError': false
            };
        };

        this.renderHtml = function () {
            var html = '<div class="widget-content widget-infotableselector"></div>';
            return html;
        };

        this.afterRender = function () {
            thisWidget.setProperty('NoRowsSelected',true);
            thisWidget.setProperty('AnyRowsSelected',false);
        };

        this.handleSelectionUpdate = function (propertyName, selectedRows, selectedRowIndices) {
            if (propertyName == "Data") {
                var nSelectedRows = selectedRows.length;
                if(nSelectedRows > 0) {
                    currentSelectedRowNumber = selectedRowIndices[0];
                    thisWidget.setProperty('NoRowsSelected',false);
                    thisWidget.setProperty('AnyRowsSelected',true);
                } else {
                    currentSelectedRowNumber = undefined;
                    thisWidget.setProperty('NoRowsSelected',true);
                    thisWidget.setProperty('AnyRowsSelected',false);
                }
                thisWidget.setProperty('SelectRowNumber', currentSelectedRowNumber);
                var selectIndexRows = [];
                for (var i = 0; i < selectedRowIndices.length; i++) {
                    selectIndexRows.push({
                        SelectRowNumber: selectedRowIndices[i]
                    });
                }
                thisWidget.setProperty('MultiSelectRowNumbers', {
                    rows: selectIndexRows,
                    dataShape: {
                        fieldDefinitions: {
                            SelectRowNumber: {
                                name: "SelectRowNumber",
                                baseType: "INTEGER"
                            }
                        }
                    }
                });
            }
        };

        this.serviceInvoked = function (serviceName) {
            switch( serviceName ) {
                case 'ClearSelectedRows':
                    thisWidget.updateSelection('Data', []);
                    currentSelectedRowNumber = undefined;
                    thisWidget.setProperty('NoRowsSelected',true);
                    thisWidget.setProperty('AnyRowsSelected',false);
                    break;
                case 'SelectFirstRow':
                    if( numRows > 0 ) {
                        currentSelectedRowNumber = 0;
                        thisWidget.setProperty('NoRowsSelected',false);
                        thisWidget.setProperty('AnyRowsSelected',true);
                        thisWidget.updateSelection('Data', [0]);
                    }
                    break;
                case 'SelectNextRow':
                    if( numRows > 0 ) {
                        if( currentSelectedRowNumber < (numRows-1) ) {
                            currentSelectedRowNumber += 1;
                            thisWidget.updateSelection('Data', [currentSelectedRowNumber]);
                        }
                    }
                    break;
                case 'SelectPreviousRow':
                    if( numRows > 0 ) {
                        if( currentSelectedRowNumber > 0 ) {
                            currentSelectedRowNumber -= 1;
                            thisWidget.updateSelection('Data', [currentSelectedRowNumber]);
                        }
                    }
                    break;
                default:
                    TW.log.error('inftoableselector widget, unexpected serviceName invoked "' + serviceName + '"');
            }
        };

        this.updateProperty = function (updatePropertyInfo) {
            if (updatePropertyInfo.TargetProperty === "Data") {
                thisWidget.lastData = updatePropertyInfo;

                var rows = updatePropertyInfo.ActualDataRows;
                numRows = rows.length;
                if (numRows>0)
                {thisWidget.setProperty('HasRows',true);
                thisWidget.setProperty('NoRows',false);
            }
            else if (numRows===0)
            {
                thisWidget.setProperty('HasRows',false);
                thisWidget.setProperty('NoRows',true);
            }

				thisWidget.setProperty('RowCount',numRows);
                var selectedRowIndices = updatePropertyInfo.SelectedRowIndices;

                if (selectedRowIndices !== undefined) {
                    if(selectedRowIndices.length > 0) {
                        currentSelectedRowNumber = selectedRowIndices[0];
                        thisWidget.setProperty('NoRowsSelected',false);
                        thisWidget.setProperty('AnyRowsSelected',true);
                    } else {
                        thisWidget.setProperty('NoRowsSelected',true);
                        thisWidget.setProperty('AnyRowsSelected',false);
                    }
                } else {
                    thisWidget.setProperty('NoRowsSelected',true);
                    thisWidget.setProperty('AnyRowsSelected',false);
                }

            } else if (updatePropertyInfo.TargetProperty === "SelectRowNumber") {
                thisWidget.lastData = updatePropertyInfo;
                var rowNumber = parseInt(updatePropertyInfo.SinglePropertyValue);
                if (( numRows > rowNumber ) && (rowNumber >= 0)) {
                    currentSelectedRowNumber = rowNumber;
                    thisWidget.setProperty('NoRowsSelected',false);
                    thisWidget.setProperty('AnyRowsSelected',true);
                    thisWidget.updateSelection('Data', [rowNumber]);
                }
            } else if (updatePropertyInfo.TargetProperty === "MultiSelectRowNumbers") {
                thisWidget.lastData = updatePropertyInfo;
                var dataShape = updatePropertyInfo.DataShape;
                var SelectRowNumberField = thisWidget.getProperty('SelectRowNumberField');
                if (!SelectRowNumberField || !dataShape[SelectRowNumberField] ||
                    (dataShape[SelectRowNumberField].baseType !== 'INTEGER' && dataShape[SelectRowNumberField].baseType !== 'NUMBER')) {
                    SelectRowNumberField = null;
                    // Fall back to any field of INTEGER baseType
                    for (var field in dataShape) {
                        if (dataShape.hasOwnProperty(field) && dataShape[field].baseType === 'INTEGER') {
                            SelectRowNumberField = field;
                            break;
                        }
                    }
                    if (SelectRowNumberField === null) {
                        // Fall back to any field of NUMBER base type otherwise
                        for (var field in dataShape) {
                            if (dataShape.hasOwnProperty(field) && dataShape[field].baseType === 'NUMBER') {
                                SelectRowNumberField = field;
                                break;
                            }
                        }
                    }
                }
                if (SelectRowNumberField) {
                    var rowNumbers = [];
                    for (var i = 0; i < updatePropertyInfo.ActualDataRows.length; i++) {
                        var indexObj = updatePropertyInfo.ActualDataRows[i];
                        var index = indexObj[SelectRowNumberField];
                        if (index === parseInt(index, 10) && index >= 0) { // index is a non-negative integer.
                            rowNumbers.push(index);
                        }
                    }
                    if ( rowNumbers.length > 0 ) {
                        currentSelectedRowNumber = rowNumbers[0];
                        thisWidget.setProperty('NoRowsSelected',false);
                        thisWidget.setProperty('AnyRowsSelected',true);
                    } else {
                        thisWidget.setProperty('NoRowsSelected',true);
                        thisWidget.setProperty('AnyRowsSelected',false);
                    }
                    thisWidget.updateSelection('Data', rowNumbers);
                }
            }
        };

        this.beforeDestroy = function () {
            var domElementId = this.jqElementId;
            var widgetElement = this.jqElement;

            try {
                widgetElement.unbind();
            }
            catch (destroyErr) {
            }

            try {
                widgetElement.empty();
            }
            catch (destroyErr) {
            }
        };
    };
}());
