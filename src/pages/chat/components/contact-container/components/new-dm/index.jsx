import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Lottie from "react-lottie";
import { animationDefaultOptions, getColor } from "@/lib/utils";
import apiClient from "@/lib/api-client";
import { HOST, SEARCH_ROUTE } from "@/utils/constant";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const NewDM = () => {
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchedContacts, setsearchedContacts] = useState([]);

  const searchContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(
          SEARCH_ROUTE,
          { searchTerm },
          {
            withCredentials: true,
          }
        );
        if (response.status === 200 && response.data.contacts) {
          setsearchedContacts(response.data.contacts);
        } else {
          setsearchedContacts([]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const selectNewContacts = (contact) => {
    setOpenNewContactModal(false);
    setsearchedContacts([]);
  };

  return (
    <>
      <div className="flex justify-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <FaPlus
                className="text-neutral-400 font-light text-opacity-90 hover:text-neutral-100
                cursor-pointer transition-all duration-300"
                onClick={() => setOpenNewContactModal(true)}
              />
            </TooltipTrigger>
            <TooltipContent
              side="left"
              className="bg-[#1c1b1e] border-none mb-2 p-3 text-white"
            >
              Select New Contact
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col ">
          <DialogHeader>
            <DialogTitle>Please Select Contact</DialogTitle>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contact"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none "
              onChange={(e) => searchContacts(e.target.value)}
            />
          </div>
          <ScrollArea className="h-[250px]">
            <div className="flex flex-col gap-5">
              {searchedContacts.map((contact) => (
                <div
                  key={contact._id}
                  className="flex gap-3 items-center cursor-pointer"
                  onClick={() => selectNewContacts(contact)}
                >
                  <div className="w-12 h-12 relative">
                    <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                      {contact.image ? (
                        <AvatarImage
                          src={`${HOST}/${contact.image}`}
                          alt="profile"
                          className="object-cover w-full h-full bg-black"
                        />
                      ) : (
                        <div
                          className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                            contact.color
                          )}`}
                        >
                          {contact.firstName
                            ? contact.firstName.charAt(0).toUpperCase()
                            : contact.email.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </Avatar>
                  </div>
                  <div className="flex flex-col">
                    <span>
                      {contact?.firstName && contact?.lastName
                        ? `${contact.firstName} ${contact.lastName}`
                        : "contact.email"}
                    </span>
                    <span className="text-xs">{contact.email}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          {searchedContacts.length <= 0 && (
            <div className="flex-1 hidden md:flex flex-col justify-center items-center bg-[#1c1d25] transition-opacity duration-700 mb-5">
              <figure aria-label="Empty chat animation">
                <Lottie
                  isClickToPauseDisabled
                  height={100}
                  width={100}
                  options={animationDefaultOptions}
                />
              </figure>
              <div className="opacity-80 text-white flex flex-col gap-4 mt-0 items-center text-center text-xl lg:text-2x1">
                <h3 className="font-medium">
                  Hi<span className="text-purple-500">!</span> Search New
                  <span className="text-purple-500"> Contact </span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDM;
