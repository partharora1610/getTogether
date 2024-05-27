import React, { useEffect } from "react"
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react"
import { fabric } from "fabric"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
        <div className="flex gap-6">
          <div className="cursor-pointer flex" onClick={onAddCakeTable}>
            <TooltipComponent img={"/cake-table.png"} hover="Cake Table" />
          </div>

          <div className="cursor-pointer flex" onClick={onAddFoodTable}>
            <TooltipComponent img={"/food_1.svg"} hover="Food Counter" />
          </div>

          <div className="cursor-pointer flex" onClick={onAddSeating}>
            <TooltipComponent img={"/chair_1.svg"} hover="Seating Individual" />
          </div>

          <div className="cursor-pointer flex" onClick={onAddSeating_1}>
            <TooltipComponent img={"/guest_1.png"} hover="Seating Group" />
          </div>

          <div className="cursor-pointer flex" onClick={onAddStage_3}>
            <TooltipComponent img={"/stage_3.svg"} hover="Main Stage" />
          </div>

          <div className="cursor-pointer flex" onClick={onAddTable}>
            <TooltipComponent img={"/table_1.svg"} hover="Table" />
          </div>

          <div className="cursor-pointer flex" onClick={onAddTable}>
            <TooltipComponent img={"/"} hover="Entrance Gate" />
          </div>

          <div className="cursor-pointer flex" onClick={onAddTable}>
            <TooltipComponent img={""} hover="Emergency Exit" />
          </div>

          {/* 
          <button onClick={onAddFoodTable}>Food Table</button>
          <button onClick={onAddSeating}>Seating</button>
          <button onClick={onAddSeating_1}>Seating 1</button>
          <button onClick={onAddStage_3}>Stage 3</button>
          <button onClick={onAddTable}>Table</button>
          <button onClick={() => console.log(selectedObjects)}>
            Selected Objects
          </button> */}
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

const TooltipComponent = ({ img, hover }: { img: string; hover: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <img src={img} alt="" className="w-10 h-10" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{hover}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default Canvas
