import { SelectOption } from "@/src/components/Select/Select.types";

export interface CourseSetting {
   id?: string;
   course_name?: string;
   course_id?: string;
   course_description?: string;
   course_description_html?: string;
   course_categories: string[];
   course_type: string;
   start_date: string | null;
   end_date: string | null;
   self_enrolment: string;
   due_date_days: number;
   course_banner: string | null;
   course_banner_media_address: string | null;
   certification_downloadable: boolean;
   course_downloadable: string;
   
   assign_immediately: boolean; // client field
   geofence_required: boolean;
   auto_assign: string;
   auto_assign_designation: SelectOption[];
}
