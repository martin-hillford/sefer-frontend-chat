import { useGetAsync } from 'sefer-fetch';
import { useEffect, useState } from 'react';
import Student from '../types/Student';

export default (mentorId : number) => {
  const get = useGetAsync<{ inactive : Student[], active : Student[] }>();
  const [students, setStudents] = useState<{ inactive : Student[], active : Student[] } | null>();

  useEffect(() => {
    get('/mentor/students').then(result => {
      if (!result.ok) setStudents(null);
      else setStudents(result.body);
    });
  }, [mentorId]);

  return students;
};
