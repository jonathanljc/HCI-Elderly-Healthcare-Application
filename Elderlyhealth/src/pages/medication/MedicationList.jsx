import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Plus, Clock, AlertCircle, Pill, Calendar, Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const MedicationForm = ({ onSubmit, initialData = null }) => {
  const form = useForm({
    defaultValues: {
      name: initialData?.name || "",
      dosage: initialData?.dosage || "",
      frequency: initialData?.frequency || "daily",
      timing: initialData?.timing || [],
      notes: initialData?.notes || "",
      startDate: initialData?.startDate || "",
      endDate: initialData?.endDate || "",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit({
      ...data,
      id: initialData?.id || Date.now(),
    });
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Medication Name</Label>
        <Input
          id="name"
          {...form.register("name", { required: true })}
          placeholder="Enter medication name"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dosage">Dosage</Label>
          <Input
            id="dosage"
            {...form.register("dosage", { required: true })}
            placeholder="e.g., 50mg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="frequency">Frequency</Label>
          <Select
            onValueChange={(value) => form.setValue("frequency", value)}
            defaultValue={form.getValues("frequency")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="as-needed">As Needed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            {...form.register("startDate", { required: true })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End Date (Optional)</Label>
          <Input id="endDate" type="date" {...form.register("endDate")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          {...form.register("notes")}
          placeholder="Add any special instructions or notes"
          className="h-20"
        />
      </div>

      <Button type="submit" className="w-full">
        {initialData ? "Update Medication" : "Add Medication"}
      </Button>
    </form>
  );
};

const MedicationCard = ({ medication, onEdit, onDelete }) => {
  const getStatusBadge = () => {
    const today = new Date();
    const startDate = new Date(medication.startDate);
    const endDate = medication.endDate ? new Date(medication.endDate) : null;

    if (today < startDate) {
      return <Badge variant="secondary">Not Started</Badge>;
    } else if (endDate && today > endDate) {
      return <Badge variant="outline">Completed</Badge>;
    }
    return <Badge variant="success">Active</Badge>;
  };

  return (
    <Card className="group">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{medication.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <Clock className="h-3 w-3" />
              {medication.frequency}
            </CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Pill className="h-4 w-4 text-muted-foreground" />
            <span>{medication.dosage}</span>
          </div>
          {medication.notes && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4 mt-0.5" />
              <span>{medication.notes}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex justify-end gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(medication)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(medication.id)}
          >
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default function MedicationList() {
  const [medications, setMedications] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingMedication, setEditingMedication] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const storedMedications =
      JSON.parse(localStorage.getItem("medications")) || [];
    setMedications(storedMedications);
  }, []);

  const handleSaveMedication = (medicationData) => {
    let updatedMedications;
    if (editingMedication) {
      updatedMedications = medications.map((med) =>
        med.id === medicationData.id ? medicationData : med
      );
      toast({
        title: "Medication Updated",
        description: `${medicationData.name} has been updated successfully.`,
      });
    } else {
      updatedMedications = [...medications, medicationData];
      toast({
        title: "Medication Added",
        description: `${medicationData.name} has been added to your medications.`,
      });
    }

    setMedications(updatedMedications);
    localStorage.setItem("medications", JSON.stringify(updatedMedications));
    setIsAddDialogOpen(false);
    setEditingMedication(null);
  };

  const handleDelete = (id) => {
    const updatedMedications = medications.filter((med) => med.id !== id);
    setMedications(updatedMedications);
    localStorage.setItem("medications", JSON.stringify(updatedMedications));
    toast({
      title: "Medication Deleted",
      description: "The medication has been removed from your list.",
      variant: "destructive",
    });
  };

  const handleEdit = (medication) => {
    setEditingMedication(medication);
    setIsAddDialogOpen(true);
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Medications</h1>
          <p className="text-muted-foreground">
            Manage your medications and schedules
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Medication
        </Button>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingMedication ? "Edit Medication" : "Add New Medication"}
            </DialogTitle>
            <DialogDescription>
              Enter the medication details below. All fields marked with * are
              required.
            </DialogDescription>
          </DialogHeader>
          <MedicationForm
            onSubmit={handleSaveMedication}
            initialData={editingMedication}
          />
        </DialogContent>
      </Dialog>

      {medications.length > 0 ? (
        <div className="grid gap-4">
          {medications.map((medication) => (
            <MedicationCard
              key={medication.id}
              medication={medication}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Pill className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="mt-4 text-lg font-semibold">No medications added</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Add your first medication to start tracking your prescriptions
          </p>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="mt-4"
            variant="outline"
          >
            Add Medication
          </Button>
        </Card>
      )}
    </div>
  );
}
