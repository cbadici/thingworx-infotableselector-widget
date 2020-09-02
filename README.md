# thingworx-infotableselector-widget
[Unofficial/Not Supported] Infotable selector widget that allows a variety of client-side operations on infotables.
It was not created by me. Anyone who might have information on who created it, please contact me to add credits here.

Compared to the standard one that is widely known internally, this version has a RowCount(NUMBER), HasRows(BOOLEAN) and NoRows(BOOLEAN) properties.

The infotable selector widget allows the developer to perform the following operations on infotables:

  - programatically setting the selected row number (works with multiple selected rows)
  - retrieving the number of rows (useful in an expression/validator)
  - understanding if the source infotable has rows or not (reduces the need of an expression, useful in driving UI behavior)
  - understanding if any row is selected (boolean, the helps understanding if there are selected rows or not)
  - understanding if no rows are selected (boolean, the helps understanding if no rows are selected).
  - clear the selected rows
  - select first row
  - select next row
  - select previous row

No documentation is available or provided except what is above in this repository. 
Feel free to fork/add issues. It is preferred to fork and then do a pull request back, since raising an issue is not guaranteed to result in a fix.

This Extension is provided as-is and without warranty or support. It is not part of the PTC product suite. Users are free to use, fork and modify them at their own risk. Community contributions are welcomed and can be accepted based on their content.
