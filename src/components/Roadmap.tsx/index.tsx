import { Tab } from '@headlessui/react';
import * as React from 'react';
import { DragDropContext, Draggable, DraggableLocation, Droppable } from 'react-beautiful-dnd';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { Link, useHistory } from 'react-router-dom';
import useAcceptedRequests, { RequestReturnType } from 'src/data/useAcceptedRequests';
import { updateRequestStatus } from 'src/utils/api';
import AngleLeft from '../../icons/AngleLeft';
import { RoadmapRequestCard } from '../common/RequestCard';
import Spinner from '../primitives/Spinner';

export default function Roadmap() {
  const history = useHistory();
  const [selectedTab, setSelectedTab] = React.useState(0);
  const { loading, groupedData } = useAcceptedRequests();

  const { planned, ['in-progress']: inProgress, live } = groupedData;

  return (
    <main className="page-container">
      <Helmet>
        <title>Product Roadmap - Feedback Board</title>
      </Helmet>
      <div className="flex items-center justify-between bg-dark text-white px-6 py-5 md:p-8 md:py-7 md:rounded">
        <div>
          <button onClick={history.goBack} className="flex items-center space-x-4 text-white">
            <AngleLeft className="text-xs" />
            <span className="font-bold text-sm">Go Back</span>
          </button>
          <h1 className="font-bold text-lg mt-2">Roadmap</h1>
        </div>

        <Link to="/new" className="btn primary">
          + Add Feedback
        </Link>
      </div>

      {loading ? (
        <Spinner className="text-6xl mx-auto mt-16" />
      ) : (
        <>
          <div className="md:hidden">
            <Tab.Group onChange={setSelectedTab}>
              <Tab.List
                className={`border-b border-light grid grid-cols-3 before:h-1 before:bg-primary before:w-1/3 ${
                  selectedTab === 1
                    ? 'before:translate-x-full'
                    : selectedTab === 2
                    ? 'before:translate-x-[200%]'
                    : ''
                } relative before:absolute before:bottom-0 before:transition-transform`}
              >
                <Tab as={React.Fragment}>
                  {({ selected }) => (
                    <button
                      className={`py-5 w-full flex text-default justify-center text-small font-bold ${
                        selected ? '' : 'text-opacity-40'
                      }`}
                    >
                      Planned ({planned.length})
                    </button>
                  )}
                </Tab>
                <Tab as={React.Fragment}>
                  {({ selected }) => (
                    <button
                      className={`py-5 w-full flex text-default justify-center text-small font-bold ${
                        selected ? '' : 'text-opacity-40'
                      }`}
                    >
                      In-Progress ({inProgress.length})
                    </button>
                  )}
                </Tab>
                <Tab as={React.Fragment}>
                  {({ selected }) => (
                    <button
                      className={`py-5 w-full flex text-default justify-center text-small font-bold ${
                        selected ? '' : 'text-opacity-40'
                      }`}
                    >
                      Live ({live.length})
                    </button>
                  )}
                </Tab>
              </Tab.List>
              <Tab.Panels className="p-6">
                <Tab.Panel>
                  <h2 className="text-lg font-bold">Planned ({planned.length})</h2>
                  <p className="text-light text-small">Ideas prioritized for research</p>
                  <ul className="space-y-4 mt-6">
                    {planned.map((feedback) => (
                      <li key={feedback.id}>
                        <RoadmapRequestCard request={feedback} />
                      </li>
                    ))}
                  </ul>
                </Tab.Panel>
                <Tab.Panel>
                  <h2 className="text-lg font-bold">In-Progress ({inProgress.length})</h2>
                  <p className="text-light text-small">Currently being developed</p>
                  <ul className="space-y-4 mt-6">
                    {inProgress.map((feedback) => (
                      <li key={feedback.id}>
                        <RoadmapRequestCard request={feedback} />
                      </li>
                    ))}
                  </ul>
                </Tab.Panel>
                <Tab.Panel>
                  <h2 className="text-lg font-bold">Live ({live.length})</h2>
                  <p className="text-light text-small">Released features</p>
                  <ul className="space-y-4 mt-6">
                    {live.map((feedback) => (
                      <li key={feedback.id}>
                        <RoadmapRequestCard request={feedback} />
                      </li>
                    ))}
                  </ul>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>

          <div className="mobile:hidden mt-8 lg:mt-12">
            <KanbanBoard />
          </div>
        </>
      )}
    </main>
  );
}

function KanbanBoard() {
  const [requests, setRequests] = React.useState<{
    planned: RequestReturnType[];
    'in-progress': RequestReturnType[];
    live: RequestReturnType[];
  }>({
    planned: [],
    'in-progress': [],
    live: [],
  });
  const { data, groupedData } = useAcceptedRequests();
  const { planned, ['in-progress']: inProgress, live } = requests;

  React.useEffect(() => {
    setRequests(groupedData);
  }, [data]);

  async function updateStatus(from: DraggableLocation, to: DraggableLocation) {
    try {
      // remove from source list
      // @ts-ignore
      const sourceCopy = Array.from(requests[from.droppableId]) as RequestReturnType[];
      const [removedItem] = sourceCopy.splice(from.index, 1);
      // add to destination list
      // @ts-ignore
      const destinationCopy = Array.from(requests[to.droppableId]) as RequestReturnType[];
      destinationCopy.splice(to.index, 0, { ...removedItem, status: to.droppableId });

      setRequests({
        ...requests,
        [from.droppableId]: sourceCopy,
        [to.droppableId]: destinationCopy,
      });
      updateRequestStatus(removedItem.id, to.droppableId); // update status on the db
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <DragDropContext
      onDragEnd={(result) => {
        const { source, destination } = result;
        if (!destination?.droppableId) return; // type guard
        if (destination?.droppableId !== source.droppableId) {
          updateStatus(source, destination);
        }
      }}
    >
      <div className="grid grid-cols-3 gap-4 lg:gap-8">
        <div>
          <h2 className="font-bold">Planned ({planned?.length})</h2>
          <p className="text-light text-sm">Ideas prioritized for research</p>
          <Droppable droppableId="planned">
            {({ droppableProps, innerRef, placeholder }) => (
              <ul {...droppableProps} ref={innerRef} className="space-y-4 lg:space-y-6 mt-6">
                {planned?.map((feedback, index) => (
                  <Draggable draggableId={feedback.id} index={index} key={feedback.id}>
                    {({ draggableProps, dragHandleProps, innerRef }) => (
                      <li {...draggableProps} {...dragHandleProps} ref={innerRef}>
                        <RoadmapRequestCard request={feedback} />
                      </li>
                    )}
                  </Draggable>
                ))}
                {placeholder}
              </ul>
            )}
          </Droppable>
        </div>
        <div>
          <h2 className="font-bold">In-Progress ({inProgress?.length})</h2>
          <p className="text-light text-sm">Currently being developed</p>
          <Droppable droppableId="in-progress">
            {({ droppableProps, innerRef, placeholder }) => (
              <ul {...droppableProps} ref={innerRef} className="space-y-4 lg:space-y-6 mt-6">
                {inProgress?.map((feedback, index) => (
                  <Draggable draggableId={feedback.id} index={index} key={feedback.id}>
                    {({ draggableProps, dragHandleProps, innerRef }) => (
                      <li key={feedback.id} {...draggableProps} {...dragHandleProps} ref={innerRef}>
                        <RoadmapRequestCard request={feedback} />
                      </li>
                    )}
                  </Draggable>
                ))}
                {placeholder}
              </ul>
            )}
          </Droppable>
        </div>
        <div>
          <h2 className="font-bold">Live ({live?.length})</h2>
          <p className="text-light text-sm">Released features</p>
          <Droppable droppableId="live">
            {({ droppableProps, innerRef, placeholder }) => (
              <ul {...droppableProps} ref={innerRef} className="space-y-4 lg:space-y-6 mt-6">
                {live?.map((feedback, index) => (
                  <Draggable draggableId={feedback.id} index={index} key={feedback.id}>
                    {({ draggableProps, dragHandleProps, innerRef }) => (
                      <li key={feedback.id} {...draggableProps} {...dragHandleProps} ref={innerRef}>
                        <RoadmapRequestCard request={feedback} />
                      </li>
                    )}
                  </Draggable>
                ))}
                {placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
}
