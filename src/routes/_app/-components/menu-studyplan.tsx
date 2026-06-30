import { Button } from "#/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "#/components/ui/dropdown-menu";
import { Input } from "#/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { ChevronsUpDown, PlusIcon } from "lucide-react";
import { useState } from "react";

export function MenuStudyPlan() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Button variant={"groups"}>
            Concurso BB
            <ChevronsUpDown className="text-zinc-400 ml-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>PLANO DE ESTUDOS</DropdownMenuLabel>
            <DropdownMenuItem>
              <span>Concurso</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={"text-zinc-300/90"}
            onClick={(e) => {
              e.preventDefault()
              setOpen(true)
            }}
          >
            <PlusIcon />
            Criar novo plano
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Criar plano personalizado</AlertDialogTitle>
					  <div className="shrink-0 bg-zinc-800 w-full h-px" />
          </AlertDialogHeader>
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-sm text-zinc-200 font-bold">Nome do plano</span>
              <AlertDialogDescription>Este é o nome que identifica o seu plano de estudos.</AlertDialogDescription>
              <Input className="w-full mt-3" placeholder="Polícia Cívil DF" />
            </div>
            <div>
              <span className="text-sm text-zinc-200 font-bold">Cor do plano</span>
              <AlertDialogDescription>Selecione uma cor especial para o seu plano de estudos.</AlertDialogDescription>
              <Input className="w-full mt-3" placeholder="Polícia Cívil DF" />
            </div>
            <div>
              <span className="text-sm text-zinc-200 font-bold">Descrição do plano</span>
              <AlertDialogDescription className={"truncate"}>Detalhe um pouco mais sobre o seu plano de estudos.</AlertDialogDescription>
              <Input className="w-full mt-3" placeholder="Agente Administrativo" />
            </div>
          </div>
          <AlertDialogFooter className="mt-7">
            <AlertDialogCancel className={"rounded-md"}>Cancelar</AlertDialogCancel>
            <AlertDialogAction className={"rounded-md"}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}