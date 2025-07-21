import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import StepOneTags from "./StepOneTags";
import StepTwoTitle from "./StepTwoTitle";
import StepThreeContent from "./StepThreeContent";
import createBlog from "@/assets/createBlog.jpg";
import { useAuth } from "@/context/useAuth";
import useStore from "@/context/useStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function MultiStepBlog() {
  const [step, setStep] = useState(1);
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const { createNewBlog } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const payload = { tags, title, content };
      await createNewBlog(payload);
      toast.success("Your post was successfully created!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to create post. Please try again.");
      console.error(error);
    }
  };

  const isStepValid = () => {
    if (step === 1) return tags.length > 0;
    if (step === 2) return title.trim() !== "";
    if (step === 3) return content.trim() !== "";
    return false;
  };

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      {/* Left Image Section */}
      <div className="w-1/2 h-full">
        <img
          src={createBlog}
          alt="Create blog"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-1/2 h-full flex flex-col px-8 py-6 bg-background">
        {/* Content */}
        <div className="flex-1">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 h-full"
          >
            <h2 className="text-xl font-semibold">Step {step} of 3</h2>

            {step === 1 && <StepOneTags tags={tags} setTags={setTags} />}
            {step === 2 && <StepTwoTitle title={title} setTitle={setTitle} />}
            {step === 3 && (
              <StepThreeContent
                content={content}
                setContent={setContent}
                title={title}
                username={user?.name || "Guest"}
                tags={tags}
              />
            )}
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between border-t pt-4 mt-4">
          <Button
            variant="ghost"
            disabled={step === 1}
            onClick={() => setStep((prev) => prev - 1)}
          >
            Back
          </Button>

          {step < 3 ? (
            <Button
              onClick={() => setStep((prev) => prev + 1)}
              disabled={!isStepValid()}
            >
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!isStepValid()}>
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
