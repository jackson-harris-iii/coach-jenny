import { TextInput } from 'flowbite-react';
import Spinner from '../components/Spinner';
import { useState } from 'react';

const Create = () => {
  const [courseDescription, setCourseDescription] = useState('');
  const [courseResponse, setCourseResponse] = useState<null | string>(null);
  const [submitting, setSubmitting] = useState(false);
  const handleCreateCourse = async (event) => {
    event.preventDefault();
    console.log('here is the course description', courseDescription);
    try {
      setSubmitting(true);
      const res = await fetch('/api/create_course', {
        method: 'POST',
        body: JSON.stringify({
          content: courseDescription,
        }),
      });
      const data = await res.json();
      console.log('here is the res', res.body);
      console.log(res);
      console.log('here is the data', data);
      setCourseResponse(data);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      console.log(error);
    }
  };
  if (submitting) {
    return <Spinner />;
  }

  if (courseResponse) {
    return <div>{`${courseResponse.info.content}`}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl mb-4">Make a course</h1>
      <TextInput
        id="large"
        type="text"
        sizing="lg"
        helperText="Tell me a little about what you'd like to learn about."
        onChange={(e) => setCourseDescription(e.target.value)}
      />
      <button
        className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0 px-4 py-2 rounded mt-4"
        type="submit"
        onClick={handleCreateCourse}
      >
        Create Course
      </button>
    </div>
  );
};

export default Create;
