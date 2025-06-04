
import React, { useState, useMemo } from 'react';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import AddLogoModal from '../components/dashboard/AddLogoModal';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { LogoProject, LogoProjectStatus, NewLogoProjectData } from '../types';
import { MOCK_LOGO_PROJECTS, PlusIcon, DotsHorizontalIcon, GridIcon, ListIcon } from '../constants';

const DashboardPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<LogoProject[]>(MOCK_LOGO_PROJECTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('#all'); // Corresponds to NavItem path
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');


  const handleSaveProject = (projectData: NewLogoProjectData) => {
    const newProject: LogoProject = {
      id: Date.now().toString(),
      clientName: projectData.clientName,
      category: projectData.category,
      colors: projectData.colors,
      fonts: projectData.fonts,
      links: projectData.links,
      notes: projectData.notes,
      fileName: projectData.fileName,
      status: projectData.status === 'Published' ? LogoProjectStatus.PUBLISHED : LogoProjectStatus.DRAFT,
      thumbnailUrl: `https://picsum.photos/seed/new${Date.now().toString()}/80/80`, // Placeholder thumbnail
      lastModified: 'Just now',
    };
    setProjects(prevProjects => [newProject, ...prevProjects]);
    console.log('Project saved:', newProject);
  };

  const filteredProjects = useMemo(() => {
    let filtered = projects;
    if (activeFilter === '#recent') { // Example filter logic
      // Sort by a hypothetical date or just take first few for demo
      filtered = projects.slice(0, 3);
    } else if (activeFilter === '#starred') {
      filtered = projects.filter(p => p.clientName.includes('Inc')); // Mock: star projects with 'Inc'
    } else if (activeFilter === '#trash') {
      filtered = []; // Mock: no trash items yet
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [projects, searchTerm, activeFilter]);

  const getStatusColor = (status: LogoProjectStatus) => {
    switch (status) {
      case LogoProjectStatus.PUBLISHED: return 'bg-green-100 text-green-700';
      case LogoProjectStatus.DRAFT: return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const ProjectCard: React.FC<{project: LogoProject}> = ({project}) => (
    <Card className="flex flex-col">
        <img src={project.thumbnailUrl || 'https://picsum.photos/200/150'} alt={project.clientName} className="w-full h-32 object-cover" />
        <div className="p-4 flex-grow flex flex-col">
            <h3 className="text-md font-semibold text-gray-800">{project.clientName}</h3>
            <p className="text-xs text-gray-500 mb-1">{project.category}</p>
            <div className="mt-auto flex justify-between items-center pt-2">
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                    {project.status}
                </span>
                <Button variant="ghost" size="sm" className="p-1 -mr-1">
                    <DotsHorizontalIcon className="w-5 h-5 text-gray-500"/>
                </Button>
            </div>
        </div>
    </Card>
  );

  const ProjectListItem: React.FC<{project: LogoProject}> = ({project}) => (
     <div className="flex items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-150">
        <img src={project.thumbnailUrl || 'https://picsum.photos/80/80'} alt={project.clientName} className="w-12 h-12 rounded-md object-cover mr-4" />
        <div className="flex-grow">
            <h3 className="text-sm font-semibold text-gray-800">{project.clientName}</h3>
            <p className="text-xs text-gray-500">{project.category}</p>
        </div>
        <div className="w-28 text-center">
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                {project.status}
            </span>
        </div>
        <div className="w-20 text-center text-xs text-gray-500">{project.lastModified}</div>
        <div className="w-16 text-right">
            <Button variant="ghost" size="sm" className="p-1">
                <DotsHorizontalIcon className="w-5 h-5 text-gray-500"/>
            </Button>
        </div>
    </div>
  );


  return (
    <div className="flex gap-6 items-start">
      <DashboardSidebar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      
      <div className="flex-grow space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Input
            type="search"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:max-w-xs"
            wrapperClassName="flex-grow"
          />
          <div className="flex items-center gap-2">
             <Button 
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
                size="sm" 
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
                className="p-2"
              >
                <GridIcon className="w-5 h-5" />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                size="sm" 
                onClick={() => setViewMode('list')}
                aria-label="List view"
                className="p-2"
              >
                <ListIcon className="w-5 h-5" />
              </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(true)} leftIcon={<PlusIcon className="w-4 h-4" />}>
              Add Logo
            </Button>
          </div>
        </div>

        {filteredProjects.length > 0 ? (
            viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProjects.map(project => <ProjectCard key={project.id} project={project} />)}
                </div>
            ) : (
                 <div className="space-y-3">
                    <div className="hidden lg:flex items-center p-3 text-xs font-medium text-gray-500 border-b">
                        <div className="w-16 mr-4"></div> {/* Thumb */}
                        <div className="flex-grow">Name</div>
                        <div className="w-28 text-center">Status</div>
                        <div className="w-20 text-center">Modified</div>
                        <div className="w-16 text-right">Actions</div>
                    </div>
                    {filteredProjects.map(project => <ProjectListItem key={project.id} project={project} />)}
                </div>
            )
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No projects found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? "Try adjusting your search or filter." : "Get started by adding a new logo project."}
            </p>
            {!searchTerm && (
                <div className="mt-6">
                    <Button variant="primary" onClick={() => setIsModalOpen(true)} leftIcon={<PlusIcon className="w-4 h-4" />}>
                    Add New Logo
                    </Button>
                </div>
            )}
          </div>
        )}
         <p className="text-xs text-gray-500 mt-4">{filteredProjects.length} results</p>
      </div>

      <AddLogoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
      />
    </div>
  );
};

export default DashboardPage;