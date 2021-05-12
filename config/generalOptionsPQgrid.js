export default function (that) {
    return {
        reactive: that.reactive,
        editable: that.editable,
        showTitle: that.showTitle,
        animModel: {on: that.animate, duration: 300},
        title: that.title,
        collapsible: {on: that.collapsible, toggle: that.toggle},
        locale: "es",
        showBottom: that.showBottom,
        draggable: that.draggable,
        colModel: that.columns,
        width: that.width,
        height: that.heightTable,
        numberCell: {show: that.numberCells, width: 50},
        selectionModel: {type: that.selectionModel},
        rowBorders: that.rowBorders,
        columnBorders: that.columnBorders,
        stripeRows: that.stripedRows,
        postRenderInterval: -1, //call postRender synchronously.
        scrollModel: {
            autoFit: that.scrollModel
        },
        groupModel: { // Pendiente
            on: that.groupColumns,
            collapsed: [false],
            title: [
                "{0} ({1})",
                "{0} - {1}"
            ]
        },
        toolbar: {
            items: []
        },
        freezeCols: that.freezeCols,
        freezeRows: that.freezeRows,
        resizable: that.resizable,
        menuIcon: that.menuIcon,
    }
}
