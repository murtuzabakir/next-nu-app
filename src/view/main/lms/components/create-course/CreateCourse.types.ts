interface Course {
   course_name: string;
   course_id: string;
   course_description: string;
   course_categories: string[];
   course_banner?: File;
   course_banner_media_address?: string;

   course_type? : string;
   self_enrolment?: boolean;
   certification_downloadable?: boolean;
   course_downloadable?: boolean;
   assign_immediately?: boolean;
   start_date?: string;
}