import { useEffect, useState } from 'react';
import useChatContext from 'context//useChatContext';
import GroupChannel from 'types//GroupChannel';
import ChannelTool from 'types//ChannelTool';
import Channel from 'types//Channel';

const newChannel = { id: -1, name: '', students: [] };

export default (channel: Channel | undefined | null, channelTool : ChannelTool) => {
  const [groupChannel, setGroupChannel] = useState<GroupChannel>(newChannel);
  const { user } = useChatContext();

  useEffect(() => {
    if (!channel?.id || channel.id < 1) return setGroupChannel(newChannel);
    if (channelTool !== ChannelTool.ChannelInfo) return setGroupChannel(newChannel);
    const students = channel.receivers.filter(r => r.userId !== user.id).map(r => r.userId);
    return setGroupChannel({ ...channel, students });
  }, [channel, channelTool]);

  const addStudent = (studentId: number) => {
    const students = [...groupChannel.students];
    if (!students.includes(studentId)) students.push(studentId);
    setGroupChannel({ ...groupChannel, students });
  };

  const removeStudent = (studentId: number) => {
    let students = [...groupChannel.students];
    if (students.includes(studentId)) students = students.filter((id) => id !== studentId);
    setGroupChannel({ ...groupChannel, students });
  };

  const setName = (name: string) => {
    setGroupChannel({ ...groupChannel, name });
  };

  return { groupChannel, addStudent, removeStudent, setName };
};
