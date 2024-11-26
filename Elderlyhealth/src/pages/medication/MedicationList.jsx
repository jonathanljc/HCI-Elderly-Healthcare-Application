import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import {
  Plus,
  Clock,
  AlertCircle,
  Pill,
  Calendar,
  Info,
  CheckCircle2,
  Key,
} from "lucide-react";
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
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    dosage: initialData?.dosage || "",
    frequency: initialData?.frequency || "daily",
    timing: initialData?.timing || "",
    notes: initialData?.notes || "",
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: initialData?.id || Date.now(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Medication Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter medication name"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dosage">Dosage</Label>
          <Input
            id="dosage"
            name="dosage"
            value={formData.dosage}
            onChange={handleChange}
            placeholder="e.g., 50mg"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="frequency">Frequency</Label>
          <Select
            value={formData.frequency}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, frequency: value }))
            }
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
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End Date (Optional)</Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="timing">Time of Day</Label>
        <Input
          id="timing"
          name="timing"
          value={formData.timing}
          onChange={handleChange}
          placeholder="e.g., Morning, After meals"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
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
  const getStatusStyles = () => {
    const today = new Date();
    const startDate = new Date(medication.startDate);
    const endDate = medication.endDate ? new Date(medication.endDate) : null;

    if (today < startDate) {
      return {
        badge: <Badge variant="secondary">Starting Soon</Badge>,
        indicator: "bg-yellow-500",
      };
    } else if (endDate && today > endDate) {
      return {
        badge: <Badge variant="outline">Completed</Badge>,
        indicator: "bg-gray-400",
      };
    }
    return {
      badge: <Badge variant="success">Active</Badge>,
      indicator: "bg-green-500",
    };
  };

  const styles = getStatusStyles();

  return (
    <Card className="group">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{medication.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <Clock className="h-3 w-3" />
              {medication.frequency}
              {medication.timing && ` • ${medication.timing}`}
            </CardDescription>
          </div>
          {styles.badge}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Pill className="h-4 w-4 text-muted-foreground" />
            <span>{medication.dosage}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              Starts: {format(new Date(medication.startDate), "MMM d, yyyy")}
              {medication.endDate &&
                ` • Ends: ${format(
                  new Date(medication.endDate),
                  "MMM d, yyyy"
                )}`}
            </span>
          </div>
          {medication.notes && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4 mt-0.5" />
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

      {/* Instructions Card */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="space-y-3 text-muted-foreground">
              <p className="font-medium text-base">How to Use Medications:</p>

              {/* Instructions */}
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>Add new medications with dosage and schedule</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Track active and completed medications</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>Monitor start and end dates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Set medication frequencies and timings</span>
                </li>
              </ul>

              {/* Status Indicators */}
              <div className="pt-2 border-t">
                <p className="text-sm font-medium mb-2">Status Indicators:</p>
                <ul className="space-y-1.5">
                  <li className="flex gap-2 items-center text-sm">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span>Active medications</span>
                  </li>
                  <li className="flex gap-2 items-center text-sm">
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <span>Starting soon</span>
                  </li>
                  <li className="flex gap-2 items-center text-sm">
                    <div className="h-3 w-3 rounded-full bg-gray-400" />
                    <span>Completed medications</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
