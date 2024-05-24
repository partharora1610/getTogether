import React, { useEffect } from "react"
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react"
import { fabric } from "fabric"
import json from "./data.json"

const Canvas = () => {
  const [canvasJSON, setCanvasJSON] = React.useState<string | null>(null)
  const { selectedObjects, editor, onReady } = useFabricJSEditor()

  const getJSON = () => {
    setCanvasJSON(JSON.stringify(editor?.canvas.toJSON()))
    console.log(editor?.canvas.toJSON())
  }

  const onAddCircle = () => {
    console.log(editor?.canvas.toJSON())
    editor?.addCircle()
  }

  const onAddRectangle = () => {
    editor?.addRectangle()
  }

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

  useEffect(() => {
    if (editor) {
      editor.canvas.loadFromJSON(json, () => {
        editor.canvas.renderAll()
      })
    }
  }, [editor])

  return (
    <div>
      {canvasJSON && <p>{canvasJSON}</p>}
      <div className="flex gap-4">
        <button onClick={onAddCakeTable}>Cake Table</button>
        <button onClick={onAddFoodTable}>Food Table</button>
        <button onClick={onAddSeating}>Seating</button>
        <button onClick={onAddSeating_1}>Seating 1</button>
        <button onClick={onAddStage_3}>Stage 3</button>
        <button onClick={onAddTable}>Table</button>
        <button onClick={getJSON}>JSON</button>
        <button onClick={() => console.log(selectedObjects)}>
          Selected Objects
        </button>
        <button onClick={clearCanvas}>Clear Canvas</button>
      </div>
      <FabricJSCanvas
        className="sample-canvas border-2 h-[480px] w-[1000px] border-gray-200 m-auto rounded-lg"
        onReady={onReady}
      />
    </div>
  )
}

export default Canvas
