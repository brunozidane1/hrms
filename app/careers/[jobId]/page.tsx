'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, ArrowLeft, CheckCircle2, Loader2, MapPin } from 'lucide-react';
import { ApiClientError } from '@/lib/api-client';
import { atsService, type CareerApplicationPayload, type CareerJob } from '@/lib/services/ats';

const formatEmploymentType = (value: CareerJob['employment_type']) => {
  switch (value) {
    case 'PERMANENT':
      return 'Full-time';
    case 'CONTRACT':
      return 'Contract';
    case 'INTERN':
      return 'Internship';
    case 'CONSULTANT':
      return 'Consulting';
    default:
      return value;
  }
};

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const raw = String(reader.result ?? '');
      const base64 = raw.includes(',') ? raw.split(',').pop() ?? '' : raw;
      if (!base64) {
        reject(new Error('Failed to encode file.'));
        return;
      }
      resolve(base64);
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsDataURL(file);
  });

export default function CareerJobPage() {
  const params = useParams<{ jobId: string }>();
  const jobId = params?.jobId ?? '';

  const [job, setJob] = useState<CareerJob | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);

  useEffect(() => {
    const loadJob = async () => {
      try {
        if (!jobId) return;
        setIsLoading(true);
        setError('');
        const data = await atsService.getCareerJob(jobId);
        setJob(data);
      } catch (err) {
        if (err instanceof ApiClientError) {
          setError(err.message);
        } else {
          setError('Failed to load career role.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadJob();
  }, [jobId]);

  const validationError = useMemo(() => {
    if (!firstName.trim()) return 'First name is required.';
    if (!lastName.trim()) return 'Last name is required.';
    if (!email.trim()) return 'Email is required.';
    if (!resumeFile) return 'Resume file is required.';
    if (!coverLetterFile) return 'Cover letter file is required.';
    if (resumeFile.name.trim().length < 5) return 'Resume file name is too short.';
    if (coverLetterFile.name.trim().length < 5) return 'Cover letter file name is too short.';
    return '';
  }, [firstName, lastName, email, resumeFile, coverLetterFile]);

  const submitApplication = async () => {
    setError('');
    setSuccess('');

    if (validationError) {
      setError(validationError);
      return;
    }

    if (!resumeFile || !coverLetterFile) {
      setError('Resume and cover letter are required.');
      return;
    }

    try {
      setIsSubmitting(true);

      const [resumeBase64, coverLetterBase64] = await Promise.all([toBase64(resumeFile), toBase64(coverLetterFile)]);

      const payload: CareerApplicationPayload = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        resume_file_name: resumeFile.name,
        resume_file_base64: resumeBase64,
        cover_letter_file_name: coverLetterFile.name,
        cover_letter_file_base64: coverLetterBase64,
        ...(phone.trim() ? { phone: phone.trim() } : {}),
        ...(resumeFile.type ? { resume_mime_type: resumeFile.type } : {}),
        ...(coverLetterFile.type ? { cover_letter_mime_type: coverLetterFile.type } : {})
      };

      await atsService.applyCareer(jobId, payload);

      setSuccess('Application submitted successfully.');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setResumeFile(null);
      setCoverLetterFile(null);

      const resumeInput = document.getElementById('resume-upload') as HTMLInputElement | null;
      if (resumeInput) resumeInput.value = '';
      const coverInput = document.getElementById('cover-upload') as HTMLInputElement | null;
      if (coverInput) coverInput.value = '';
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to submit application.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 py-10 text-slate-600 inline-flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading job...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-5xl mx-auto px-4 py-10 md:py-14">
        <Link href="/careers" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to careers
        </Link>

        {error && !job ? (
          <div className="inline-flex items-center gap-2 text-rose-600 font-semibold">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        ) : null}

        {job ? (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <article className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h1 className="text-3xl font-bold text-slate-900">{job.title}</h1>
              <p className="text-slate-600 mt-2">{job.department.name} - {job.position.title}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">{formatEmploymentType(job.employment_type)}</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                  <MapPin className="w-3 h-3" />
                  {job.location}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-7">Role Description</h2>
              <p className="text-slate-700 mt-2 whitespace-pre-wrap leading-7">{job.description}</p>
            </article>

            <aside className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm h-fit">
              <h2 className="text-xl font-bold text-slate-900">Apply Now</h2>
              <p className="text-sm text-slate-600 mt-1 mb-4">Submit your details, resume, and cover letter.</p>

              {error ? (
                <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-rose-600">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              ) : null}
              {success ? (
                <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                  {success}
                </div>
              ) : null}

              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    placeholder="First name *"
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    placeholder="Last name *"
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email *"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Phone (optional)"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <div>
                  <label htmlFor="resume-upload" className="block text-sm font-semibold text-slate-700 mb-1">Resume *</label>
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(event) => setResumeFile(event.target.files?.[0] ?? null)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="cover-upload" className="block text-sm font-semibold text-slate-700 mb-1">Cover Letter *</label>
                  <input
                    id="cover-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={(event) => setCoverLetterFile(event.target.files?.[0] ?? null)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm"
                  />
                </div>

                <button
                  onClick={() => void submitApplication()}
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 disabled:opacity-60"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  Submit Application
                </button>
              </div>
            </aside>
          </div>
        ) : null}
      </section>
    </main>
  );
}
