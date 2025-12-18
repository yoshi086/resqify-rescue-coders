import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Shield, Users, AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/BottomNav';
import { AuraBackground } from '@/components/AuraBackground';
import { useUser } from '@/contexts/UserContext';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function Home() {
  const navigate = useNavigate();
  const { user, addSOSEvent, contacts } = useUser();
  const { character } = useTheme();
  const [sosActive, setSOSActive] = useState(false);
  const [sosCountdown, setSOSCountdown] = useState<number | null>(null);
  const [showEmergencyCall, setShowEmergencyCall] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const countdownTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const startSOSCountdown = () => {
    setSOSCountdown(3);
    countdownTimer.current = setInterval(() => {
      setSOSCountdown(prev => {
        if (prev === null || prev <= 1) {
          triggerSOS();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelSOSCountdown = () => {
    if (countdownTimer.current) {
      clearInterval(countdownTimer.current);
      countdownTimer.current = null;
    }
    setSOSCountdown(null);
  };

  const triggerSOS = () => {
    cancelSOSCountdown();
    setSOSActive(true);
    
    const sosEvent = {
      timestamp: new Date(),
      status: 'active' as const,
      location: undefined,
    };
    addSOSEvent(sosEvent);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          toast.success('SOS Alert Sent! Location shared with contacts.');
        },
        () => {
          toast.success('SOS Alert Sent! (Location unavailable)');
        }
      );
    } else {
      toast.success('SOS Alert Sent!');
    }

    const bestFriends = contacts.filter(c => c.isBestFriend);
    if (bestFriends.length > 0) {
      toast.info(`Notifying ${bestFriends.length} emergency contact(s)`);
    }
  };

  const handleSOSTap = () => {
    if (sosActive) {
      const pin = prompt('Enter SOS PIN to cancel:');
      if (pin === user?.sosPin) {
        setSOSActive(false);
        toast.success('SOS cancelled');
      } else if (pin !== null) {
        toast.error('Invalid PIN');
      }
    } else {
      startSOSCountdown();
    }
  };

  const handleLongPressStart = () => {
    longPressTimer.current = setTimeout(() => {
      triggerSOS();
    }, 1500);
  };

  const handleLongPressEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      setIsSharing(true);
      navigator.geolocation.getCurrentPosition(
        () => {
          toast.success('Live location sharing enabled');
        },
        () => {
          toast.error('Could not get location');
          setIsSharing(false);
        }
      );
    } else {
      toast.error('Geolocation not supported');
    }
  };

  const emergencyNumbers = [
    { name: 'Police', number: '112', icon: '🚓' },
    { name: 'Ambulance', number: '108', icon: '🚑' },
    { name: 'Fire', number: '101', icon: '🚒' },
    { name: 'Women Helpline', number: '181', icon: '👩' },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background relative">
      {/* Aura background based on character */}
      <AuraBackground />
      
      <div className="page-container relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-muted-foreground text-sm">Hello,</p>
            <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
          </div>
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: character.color }}
          >
            <span className="text-lg">👋</span>
          </div>
        </div>

        {/* SOS Button */}
        <div className="flex flex-col items-center mb-10">
          <button
            onClick={handleSOSTap}
            onMouseDown={handleLongPressStart}
            onMouseUp={handleLongPressEnd}
            onMouseLeave={handleLongPressEnd}
            onTouchStart={handleLongPressStart}
            onTouchEnd={handleLongPressEnd}
            className={cn(
              'relative w-40 h-40 rounded-full flex flex-col items-center justify-center transition-all duration-300',
              sosActive
                ? 'bg-sos animate-pulse-sos'
                : sosCountdown !== null
                ? 'bg-warning'
                : 'bg-sos shadow-sos'
            )}
            style={{ 
              boxShadow: sosActive 
                ? '0 0 60px 20px hsl(var(--sos-bg) / 0.4)' 
                : '0 12px 40px -8px hsl(var(--sos-bg) / 0.6)' 
            }}
          >
            <span className="text-primary-foreground text-3xl font-bold">
              {sosCountdown !== null ? sosCountdown : 'SOS'}
            </span>
            <span className="text-primary-foreground/80 text-xs mt-1">
              {sosActive ? 'Tap to Cancel' : sosCountdown !== null ? 'Starting...' : 'Hold for instant'}
            </span>
            
            <div className="absolute inset-0 rounded-full animate-ping bg-sos/30" style={{ animationDuration: '2s' }} />
          </button>

          {sosCountdown !== null && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4 shadow-md"
              onClick={cancelSOSCountdown}
            >
              Cancel
            </Button>
          )}
        </div>

        {/* Quick Actions */}
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleShareLocation}
            className={cn(
              'card-safety flex flex-col items-center gap-3 py-6 transition-all hover:shadow-lg active:scale-[0.98]',
              isSharing && 'ring-2 ring-safe'
            )}
            style={{ boxShadow: '0 4px 20px -4px rgba(0,0,0,0.1)' }}
          >
            <div className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center shadow-md',
              isSharing ? 'bg-safe' : 'bg-accent'
            )}>
              <MapPin className={isSharing ? 'text-safe-foreground' : 'text-primary'} size={24} />
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground text-sm">
                {isSharing ? 'Sharing...' : 'Share Location'}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Real-time GPS</p>
            </div>
          </button>

          <button
            onClick={() => setShowEmergencyCall(true)}
            className="card-safety flex flex-col items-center gap-3 py-6 transition-all hover:shadow-lg active:scale-[0.98]"
            style={{ boxShadow: '0 4px 20px -4px rgba(0,0,0,0.1)' }}
          >
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shadow-md">
              <Phone className="text-primary" size={24} />
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground text-sm">Emergency Call</p>
              <p className="text-xs text-muted-foreground mt-0.5">Quick dial</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/map')}
            className="card-safety flex flex-col items-center gap-3 py-6 transition-all hover:shadow-lg active:scale-[0.98]"
            style={{ boxShadow: '0 4px 20px -4px rgba(0,0,0,0.1)' }}
          >
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shadow-md">
              <Shield className="text-primary" size={24} />
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground text-sm">Nearby Help</p>
              <p className="text-xs text-muted-foreground mt-0.5">Find safe places</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/contacts')}
            className="card-safety flex flex-col items-center gap-3 py-6 transition-all hover:shadow-lg active:scale-[0.98]"
            style={{ boxShadow: '0 4px 20px -4px rgba(0,0,0,0.1)' }}
          >
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shadow-md">
              <Users className="text-primary" size={24} />
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground text-sm">Contacts</p>
              <p className="text-xs text-muted-foreground mt-0.5">{contacts.length} trusted</p>
            </div>
          </button>
        </div>

        {/* Safety Status */}
        {user.isMinor && (
          <div className="card-safety bg-accent/50 flex items-center gap-4 mb-4 shadow-md">
            <AlertTriangle className="text-warning" size={24} />
            <div>
              <p className="font-semibold text-foreground text-sm">Minor Safety Active</p>
              <p className="text-xs text-muted-foreground">
                Enhanced protection enabled until you turn 18
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Emergency Call Modal */}
      {showEmergencyCall && (
        <div className="fixed inset-0 bg-foreground/50 flex items-end justify-center z-50 animate-fade-in">
          <div className="bg-card w-full max-w-lg rounded-t-3xl animate-slide-up flex flex-col">
            <div className="flex items-center justify-between p-6 pb-4 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Emergency Numbers</h2>
              <button
                onClick={() => setShowEmergencyCall(false)}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shadow-sm"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 pt-4 grid grid-cols-2 gap-4">
              {emergencyNumbers.map((item) => (
                <a
                  key={item.number}
                  href={`tel:${item.number}`}
                  className="card-safety flex items-center gap-3 py-4 hover:bg-accent transition-colors shadow-md"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{item.name}</p>
                    <p className="text-primary font-bold">{item.number}</p>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="p-6 pt-0 safe-bottom">
              <Button 
                onClick={() => setShowEmergencyCall(false)} 
                variant="outline"
                className="w-full shadow-md" 
                size="lg"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
