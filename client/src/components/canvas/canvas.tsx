import React, { useEffect } from "react"
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react"
import { fabric } from "fabric"

import canvasStore from "@/store/create-canvas-store"

const Canvas = ({
  create,
  loadedJson,
}: {
  create: boolean
  loadedJson?: string
}) => {
  const { setJson } = canvasStore()
  const { selectedObjects, editor, onReady } = useFabricJSEditor()

  const clearCanvas = () => {
    editor?.deleteAll()
  }

  const onAddCakeTable = () => {
    fabric.Image.fromURL("/cake-table.png", (oImg) => {
      editor?.canvas.add(oImg)
    })
  }

  const onAddSeating = () => {
    fabric.Image.fromURL("/chair_1.svg", (oImg) => {
      editor?.canvas.add(oImg)
    })
  }

  const onAddSeating_1 = () => {
    fabric.Image.fromURL("/guest_1.png", (oImg) => {
      editor?.canvas.add(oImg)
    })
  }

  const onAddStage_3 = () => {
    fabric.Image.fromURL("/stage_3.svg", (oImg) => {
      editor?.canvas.add(oImg)
    })
  }

  const onAddTable = () => {
    fabric.Image.fromURL("/table_1.svg", (oImg) => {
      editor?.canvas.add(oImg)
    })
  }

  const onAddFoodTable = () => {
    fabric.Image.fromURL("/food_1.svg", (oImg) => {
      editor?.canvas.add(oImg)
    })
  }

  // Update JSON representation of the canvas in the store
  useEffect(() => {
    setJson(JSON.stringify(editor?.canvas.toJSON()))
  }, [JSON.stringify(editor?.canvas.toJSON())])

  // Effect to load the canvas from JSON when `loadedJson` is provided
  useEffect(() => {
    if (editor?.canvas && loadedJson) {
      editor.canvas.loadFromJSON(loadedJson, () => {
        editor.canvas.renderAll()
      })
    }
  }, [editor, loadedJson])

  // Effect to disable canvas and object selection based on `create` prop
  useEffect(() => {
    if (editor?.canvas) {
      editor.canvas.selection = create
      editor.canvas.defaultCursor = create ? "default" : "not-allowed"
      editor.canvas.forEachObject((obj) => {
        obj.selectable = create
      })
      editor.canvas.renderAll()
    }
  }, [create, editor])

  return (
    <div>
      {create && (
        <div className="flex gap-4">
          <button onClick={onAddCakeTable}>Cake Table</button>
          <button onClick={onAddFoodTable}>Food Table</button>
          <button onClick={onAddSeating}>Seating</button>
          <button onClick={onAddSeating_1}>Seating 1</button>
          <button onClick={onAddStage_3}>Stage 3</button>
          <button onClick={onAddTable}>Table</button>
          <button onClick={() => console.log(selectedObjects)}>
            Selected Objects
          </button>
          <button onClick={clearCanvas}>Clear Canvas</button>
        </div>
      )}
      <FabricJSCanvas
        className="sample-canvas border-2 h-[480px] w-[1000px] border-gray-200 m-auto rounded-lg"
        onReady={onReady}
      />
    </div>
  )
}

export default Canvas
