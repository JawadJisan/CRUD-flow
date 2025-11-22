import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search as SearchIcon } from 'lucide-react';
import { api } from '@/lib/axios';

// STUDENTS: This demonstrates query-based operations using URL search params
// Notice how the URL updates with search parameters

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    query: searchParams.get('query') || '',
    type: searchParams.get('type') || 'students',
    minAge: searchParams.get('minAge') || '',
    grade: searchParams.get('grade') || '',
  });

  useEffect(() => {
    if (filters.query) {
      performSearch();
    }
  }, [searchParams]);

  const performSearch = async () => {
    setLoading(true);
    try {
      let endpoint = '';
      const params = {};

      if (filters.type === 'students') {
        endpoint = '/students';
        if (filters.minAge) params.minAge = filters.minAge;
        if (filters.grade) params.grade = filters.grade;
      } else if (filters.type === 'courses') {
        endpoint = '/courses';
      }

      const response = await api.get(endpoint, { params });
      
      // Filter results based on query
      const filtered = response.data.filter((item) => {
        const searchLower = filters.query.toLowerCase();
        if (filters.type === 'students') {
          return (
            item.name.toLowerCase().includes(searchLower) ||
            item.email.toLowerCase().includes(searchLower)
          );
        } else {
          return (
            item.title.toLowerCase().includes(searchLower) ||
            item.code.toLowerCase().includes(searchLower)
          );
        }
      });

      setResults(filtered);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Update URL with search parameters
    const params = { query: filters.query, type: filters.type };
    if (filters.minAge) params.minAge = filters.minAge;
    if (filters.grade) params.grade = filters.grade;
    
    setSearchParams(params);
    performSearch();
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Search & Filter</h1>
        <p className="text-muted-foreground mt-1">
          🔍 Query-based operations with URL parameters
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="query">Search Query</Label>
                <Input
                  id="query"
                  value={filters.query}
                  onChange={(e) => handleFilterChange('query', e.target.value)}
                  placeholder="Search by name, email, course title..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Search In</Label>
                <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="students">Students</SelectItem>
                    <SelectItem value="courses">Courses</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {filters.type === 'students' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="minAge">Minimum Age</Label>
                    <Input
                      id="minAge"
                      type="number"
                      value={filters.minAge}
                      onChange={(e) => handleFilterChange('minAge', e.target.value)}
                      placeholder="e.g., 18"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade</Label>
                    <Input
                      id="grade"
                      value={filters.grade}
                      onChange={(e) => handleFilterChange('grade', e.target.value)}
                      placeholder="e.g., A"
                    />
                  </div>
                </>
              )}
            </div>

            <Button type="submit" className="w-full gap-2" disabled={loading}>
              <SearchIcon className="h-4 w-4" />
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          {results.length > 0 ? `Found ${results.length} results` : 'No results'}
        </h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((item) => (
            <Card key={item._id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">
                  {item.name || item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                {filters.type === 'students' ? (
                  <>
                    <p className="text-muted-foreground">Email: {item.email}</p>
                    <p className="text-muted-foreground">Age: {item.age}</p>
                    <p className="text-muted-foreground">Grade: {item.grade}</p>
                  </>
                ) : (
                  <>
                    <p className="text-muted-foreground">Code: {item.code}</p>
                    <p className="text-muted-foreground">Credits: {item.credits}</p>
                    <p className="text-muted-foreground line-clamp-2">{item.description}</p>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
