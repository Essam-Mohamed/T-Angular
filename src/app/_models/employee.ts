export class Employee {
  constructor(
    public Id: string,
    public EmployeeName: string,
    public StarTimeUtc: string,
    public EndTimeUtc: string,
    public EntryNotes: string,
    public DeletedOn: string | null
  ) {}
}

export interface EmployeeData {
  employeeName: string;
  deletedOn: string | null;
  attendence: AttendanceEntry[];
}

interface AttendanceEntry {
  id: string;
  starTimeUtc: string;
  endTimeUtc: string;
  entryNotes: string;
}

export interface EmployeeTotalWorkingHours {
  name: string;
  totalWorkHours: number;
}
