/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/sDTSmpRrm04
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function lingerMainPage() {
  const [timeline, setTimeline] = useState([])
  const [selectedModule, setSelectedModule] = useState(null)
  const [modules, setModules] = useState([
    { type: "video", title: "Create Video", thumbnail: "/placeholder.svg" },
    { type: "image", title: "Create Image", thumbnail: "/placeholder.svg" },
    { type: "quiz", title: "Create Quiz", thumbnail: "/placeholder.svg" },
    { type: "text", title: "Create Text", thumbnail: "/placeholder.svg" },
  ])
  const [assets, setAssets] = useState([
    { type: "video", title: "Intro Video", thumbnail: "/placeholder.svg" },
    { type: "image", title: "Product Image", thumbnail: "/placeholder.svg" },
    { type: "quiz", title: "User Quiz", thumbnail: "/placeholder.svg" },
    { type: "text", title: "Welcome Message", thumbnail: "/placeholder.svg" },
    { type: "video", title: "Outro Video", thumbnail: "/placeholder.svg" },
    { type: "image", title: "Banner Image", thumbnail: "/placeholder.svg" },
    { type: "quiz", title: "Feedback Quiz", thumbnail: "/placeholder.svg" },
    { type: "text", title: "Conclusion", thumbnail: "/placeholder.svg" },
    { type: "video", title: "Explainer Video", thumbnail: "/placeholder.svg" },
    { type: "image", title: "Testimonial Image", thumbnail: "/placeholder.svg" },
    { type: "quiz", title: "Assessment Quiz", thumbnail: "/placeholder.svg" },
    { type: "text", title: "Instructions", thumbnail: "/placeholder.svg" },
    { type: "video", title: "Walkthrough Video", thumbnail: "/placeholder.svg" },
    { type: "image", title: "Infographic", thumbnail: "/placeholder.svg" },
    { type: "quiz", title: "Certification Quiz", thumbnail: "/placeholder.svg" },
    { type: "text", title: "FAQ", thumbnail: "/placeholder.svg" },
  ])
  const [editingAsset, setEditingAsset] = useState(null)
  const [showAssetSidebar, setShowAssetSidebar] = useState(false)
  const [selectedAssets, setSelectedAssets] = useState([])
  const [newFolderName, setNewFolderName] = useState("")
  const handleDragStart = (module) => {
    setSelectedModule(module)
  }
  const handleDragOver = (index, e) => {
    e.preventDefault()
  }
  const handleDrop = (index, e) => {
    e.preventDefault()
    if (selectedModule) {
      const updatedTimeline = [...timeline]
      const existingIndex = updatedTimeline.findIndex((item) => item.title === selectedModule.title)
      if (existingIndex !== -1) {
        updatedTimeline.splice(existingIndex, 1)
      }
      updatedTimeline.splice(index, 0, selectedModule)
      setTimeline(updatedTimeline)
      setSelectedModule(null)
    }
  }
  const handleRemoveModule = (index) => {
    const updatedTimeline = [...timeline]
    const removedModule = updatedTimeline.splice(index, 1)[0]
    setTimeline(updatedTimeline)
  }
  const handleCreateAsset = (module) => {
    const newAsset = { ...module, name: "", tags: [] }
    setEditingAsset(newAsset)
  }
  const handleSaveAsset = () => {
    if (editingAsset) {
      setAssets([...assets, editingAsset])
      setEditingAsset(null)
    }
  }
  const handleCancelAsset = () => {
    setEditingAsset(null)
  }
  const handleEditAsset = (asset) => {
    setEditingAsset(asset)
  }
  const handleDeleteAsset = (index) => {
    const updatedAssets = [...assets]
    updatedAssets.splice(index, 1)
    setAssets(updatedAssets)
  }
  const handleAssetClick = (asset, e) => {
    if (e.shiftKey || e.ctrlKey) {
      setSelectedAssets([...selectedAssets, asset])
    } else {
      setSelectedAssets([asset])
    }
  }
  const handleCreateFolder = () => {
    setAssets([...assets, { type: "folder", title: newFolderName, thumbnail: "/placeholder.svg" }])
    setNewFolderName("")
  }
  return (
    <div className="flex h-screen">
      <div className="bg-background border-r p-6 flex flex-col gap-4 w-64 shrink-0">
        <h2 className="text-xl font-bold mb-4">Modules</h2>
        <div className="grid grid-cols-2 gap-4">
          {modules.map((module, index) => (
            <div
              key={index}
              className="bg-card p-4 rounded-md cursor-pointer shadow-md hover:bg-muted transition-colors"
              onClick={() => handleCreateAsset(module)}
            >
              <img
                src="/placeholder.svg"
                alt={module.title}
                width={64}
                height={48}
                className="mb-2 rounded-md object-cover aspect-[4/3]"
              />
              <p className="text-sm font-medium">{module.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-6 overflow-auto relative">
        <h2 className="text-xl font-bold mb-4">Assets</h2>
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-0 right-0 z-10"
            onClick={() => setShowAssetSidebar(!showAssetSidebar)}
          >
            <FolderIcon className="w-5 h-5" />
          </Button>
          <div className="grid grid-cols-8 gap-4">
            {assets.map((asset, index) => (
              <div
                key={index}
                className={`bg-card p-2 rounded-md cursor-grab shadow-md hover:bg-muted transition-colors relative group ${
                  selectedAssets.includes(asset) ? "bg-primary/10" : ""
                }`}
                draggable
                onDragStart={() => handleDragStart(asset)}
                onDragOver={(e) => handleDragOver(index, e)}
                onDrop={(e) => handleDrop(index, e)}
                onContextMenu={(e) => {
                  e.preventDefault()
                }}
                onClick={(e) => handleAssetClick(asset, e)}
              >
                <img
                  src="/placeholder.svg"
                  alt={asset.title}
                  width={128}
                  height={96}
                  className="mb-2 rounded-md object-cover aspect-[4/3]"
                />
                <p className="text-xs font-medium absolute bottom-2 left-2 text-card-foreground">{asset.title}</p>
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-background/80 hover:bg-background"
                    onClick={() => handleEditAsset(asset)}
                  >
                    <FilePenIcon className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-background/80 hover:bg-background"
                    onClick={() => handleDeleteAsset(index)}
                  >
                    <Trash2Icon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {showAssetSidebar && (
          <div className="fixed top-0 right-0 bottom-0 w-64 bg-background border-l p-6 overflow-auto">
            <h3 className="text-lg font-bold mb-4">Asset Library</h3>
            <div className="grid gap-4">
              {assets.map((asset, index) => (
                <div
                  key={index}
                  className={`bg-card p-4 rounded-md cursor-pointer shadow-md hover:bg-muted transition-colors ${
                    selectedAssets.includes(asset) ? "bg-primary/10" : ""
                  }`}
                  onClick={(e) => handleAssetClick(asset, e)}
                >
                  <img
                    src="/placeholder.svg"
                    alt={asset.title}
                    width={128}
                    height={96}
                    className="mb-2 rounded-md object-cover aspect-[4/3]"
                  />
                  <p className="text-sm font-medium">{asset.title}</p>
                </div>
              ))}
              <div className="bg-card p-4 rounded-md cursor-pointer shadow-md hover:bg-muted transition-colors">
                <Input
                  type="text"
                  placeholder="New Folder"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                />
                <Button onClick={handleCreateFolder} className="mt-2">
                  Create Folder
                </Button>
              </div>
            </div>
          </div>
        )}
        {editingAsset && (
          <div className="fixed inset-0 flex items-center justify-center bg-background/80">
            <div className="bg-card p-6 rounded-md shadow-md w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">Edit Asset</h3>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={editingAsset.name}
                    onChange={(e) => setEditingAsset({ ...editingAsset, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    type="text"
                    value={editingAsset.tags.join(", ")}
                    onChange={(e) =>
                      setEditingAsset({
                        ...editingAsset,
                        tags: e.target.value.split(",").map((tag) => tag.trim()),
                      })
                    }
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={handleCancelAsset}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveAsset}>Save</Button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="fixed bottom-0 left-0 right-0 bg-background p-6 border-t shadow-md">
          <div className="relative h-[150px] border rounded-md bg-card">
            <div className="absolute inset-0 flex items-center justify-center">
              {timeline.length === 0 && (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <PlusIcon className="w-12 h-12" />
                  <p>Drag and drop assets to build your lesson</p>
                </div>
              )}
              <div
                className="absolute inset-0 flex gap-4 p-4 overflow-x-auto"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(0, e)}
              >
                {timeline.map((asset, index) => (
                  <div
                    key={index}
                    className="bg-background p-4 rounded-md flex items-center gap-4 shadow-md cursor-grab"
                    draggable
                    onDragStart={() => handleDragStart(asset)}
                    onDragOver={(e) => handleDragOver(index, e)}
                    onDrop={(e) => handleDrop(index, e)}
                  >
                    <img
                      src="/placeholder.svg"
                      alt={asset.title}
                      width={64}
                      height={48}
                      className="rounded-md object-cover aspect-[4/3]"
                    />
                    <p className="text-sm font-medium">{asset.title}</p>
                    <Button variant="ghost" size="icon" className="ml-auto" onClick={() => handleRemoveModule(index)}>
                      <Trash2Icon className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2">
                <PlayIcon className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  )
}


function FolderIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  )
}


function PlayIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function Trash2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  )
}
