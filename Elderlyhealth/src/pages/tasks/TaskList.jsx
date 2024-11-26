import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Clock,
  Calendar,
  CheckCircle2,
  Plus,
  AlertCircle,
  Clock4,
  ArrowUpCircle,
  Info,
  PlusCircle,
  Filter,
  CheckSquare,
  XCircle,
} from "lucide-react";
import { format, isPast } from "date-fns";

const TaskForm = ({ onSubmit, initialTask = null, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialTask?.title || "",
    description: initialTask?.description || "",
    dueDate: initialTask?.dueDate || "",
    priority: initialTask?.priority || "medium",
    category: initialTask?.category || "health",
    status: initialTask?.status || "pending",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: initialTask?.id || Date.now(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Add task details"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select
            value={formData.priority}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, priority: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, category: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="health">Health</SelectItem>
            <SelectItem value="medication">Medication</SelectItem>
            <SelectItem value="appointment">Appointment</SelectItem>
            <SelectItem value="exercise">Exercise</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialTask ? "Update Task" : "Create Task"}
        </Button>
      </div>
    </form>
  );
};

const TaskCard = ({ task, onStatusChange }) => {
  const getPriorityStyles = (priority) => {
    const styles = {
      high: {
        badge: "bg-red-100 text-red-800",
        indicator: "bg-red-500",
      },
      medium: {
        badge: "bg-yellow-100 text-yellow-800",
        indicator: "bg-yellow-500",
      },
      low: {
        badge: "bg-green-100 text-green-800",
        indicator: "bg-green-500",
      },
    };
    return styles[priority] || styles.medium;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      health: Clock,
      medication: AlertCircle,
      appointment: Calendar,
      exercise: ArrowUpCircle,
      other: Clock4,
    };
    return icons[category] || icons.other;
  };

  const styles = getPriorityStyles(task.priority);
  const CategoryIcon = getCategoryIcon(task.category);
  const isOverdue =
    isPast(new Date(task.dueDate)) && task.status !== "completed";

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div
              className={`p-2 rounded-lg ${
                task.status === "completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <CategoryIcon className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{task.title}</h3>
                <Badge className={styles.badge}>{task.priority}</Badge>
                {task.status === "completed" && (
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700"
                  >
                    Completed
                  </Badge>
                )}
                {isOverdue && <Badge variant="destructive">Overdue</Badge>}
              </div>
              {task.description && (
                <p className="text-sm text-muted-foreground">
                  {task.description}
                </p>
              )}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>Due: {format(new Date(task.dueDate), "PPP")}</span>
              </div>
            </div>
          </div>
          <Button
            variant={task.status === "completed" ? "outline" : "default"}
            size="sm"
            onClick={() =>
              onStatusChange(
                task.id,
                task.status === "completed" ? "pending" : "completed"
              )
            }
          >
            {task.status === "completed" ? "Mark Incomplete" : "Mark Complete"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const TaskList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tasks, setTasks] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (taskData) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((task) => (task.id === taskData.id ? taskData : task))
      );
      toast({
        title: "Task Updated",
        description: "Your task has been updated successfully.",
      });
    } else {
      setTasks((prev) => [...prev, taskData]);
      toast({
        title: "Task Created",
        description: "Your new task has been created successfully.",
      });
    }
    setShowAddDialog(false);
    setEditingTask(null);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
              completedAt:
                newStatus === "completed" ? new Date().toISOString() : null,
            }
          : task
      )
    );

    toast({
      title: "Task Updated",
      description: `Task marked as ${newStatus}`,
      variant: newStatus === "completed" ? "default" : "secondary",
    });
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowAddDialog(true);
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Manage your health-related tasks and reminders
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      {/* Instructions Card */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="space-y-3 text-muted-foreground">
              <p className="font-medium text-base">How to Use Tasks:</p>

              {/* Instructions */}
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  <span>Create new health-related tasks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Organize by priority and category</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Set due dates and track progress</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckSquare className="h-4 w-4" />
                  <span>Mark tasks as completed</span>
                </li>
              </ul>

              {/* Priority Indicators */}
              <div className="pt-2 border-t">
                <p className="text-sm font-medium mb-2">Priority Levels:</p>
                <ul className="space-y-1.5">
                  <li className="flex gap-2 items-center text-sm">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <span>High priority tasks</span>
                  </li>
                  <li className="flex gap-2 items-center text-sm">
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <span>Medium priority tasks</span>
                  </li>
                  <li className="flex gap-2 items-center text-sm">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span>Low priority tasks</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">No Tasks Yet</h3>
              <p className="text-sm text-muted-foreground">
                Create your first task to start tracking your health activities
              </p>
            </CardContent>
          </Card>
        ) : (
          tasks
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={handleStatusChange}
                onEdit={() => handleEdit(task)}
              />
            ))
        )}
      </div>

      {/* Add/Edit Task Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingTask ? "Edit Task" : "Create New Task"}
            </DialogTitle>
          </DialogHeader>
          <TaskForm
            onSubmit={handleAddTask}
            initialTask={editingTask}
            onCancel={() => {
              setShowAddDialog(false);
              setEditingTask(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskList;
